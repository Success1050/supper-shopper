## Super Shopper – Navigation & Performance Review

This document lists the main issues and anti‑patterns in the current codebase that can cause slow page loads (5s+), especially when clicking dashboard menu buttons.

## 2. Dashboard layout does a blocking Supabase/server fetch on every navigation

- **File**: `app/dashboard/layout.tsx`
- **Problem**:
  - The layout is an async server component that calls `getActivePackage()` for **every** request under `/dashboard`.
- **Code**:

```8:11:app/dashboard/layout.tsx
export default async function Layout({ children }: LayoutProps) {
  const activePackage = await getActivePackage();

  return <ClientLayout activePackage={activePackage}>{children}</ClientLayout>;
}
```

- **Why it’s bad**:
  - App Router will re‑run this layout when navigating between dashboard pages, so each click on a sidebar/menu item incurs:
    - Middleware Supabase auth
    - Supabase call(s) inside `getActivePackage()`
  - This stacks on top of per‑page server actions and client‑side fetches, increasing total latency for each menu click.

---

## 3. Dashboard home makes multiple server calls from the client on mount

- **File**: `Components/Home.tsx` (`DashboardHome`)
- **Problems**:
  1. **Redundant / wasted server calls in one effect**:
     - `useEffect` depends on `userSession?.user?.id` but calls **both** `getWalletBal()` and `fetchUserSession()` in the same effect.
     - On the initial render, `userSession` is `null`, so:
       - `getWalletBal()` is called with `userSession?.user?.id` as `undefined` → server action returns early (wasted call).
       - `fetchUserSession()` then calls Supabase to get session.
       - Once `userSession` is set, the effect re‑runs and calls both functions again.
  2. **Multiple server actions from the client**:
     - On mount, the component calls **three** different server actions from `useEffect`:
       - `getUserSession()`
       - `getUserWallet(userSession?.user?.id)`
       - `getTeamMembers()`
       - `getProducts()`
- **Code (key parts)**:

```38:49:Components/Home.tsx
  const fetchUserSession = async () => {
    const res = await getUserSession();
    if (!res.success) {
      return;
    }
    setusersession(res?.data ?? null);
  };

  useEffect(() => {
    getWalletBal();
    fetchUserSession();
  }, [userSession?.user?.id]);
```

```51:73:Components/Home.tsx
  useEffect(() => {
    const fetchTeamMembers = async () => {
      const res = await getTeamMembers();
      ...
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      ...
    };
    fetchProducts();
  }, []);
```

- **Why it’s bad**:
  - Each of these server actions hits Supabase again; combined with middleware + layout, the dashboard home view can trigger **many sequential/parallel network calls** from a single navigation.
  - The first `getUserWallet` call is guaranteed to be wasted on initial load because `userSession` is not set yet.
  - This can make the first dashboard load or a return to home feel very slow (multiple Supabase round‑trips).

---

## 4. Header dashboard triggers extra Supabase work and a double navigation

- **File**: `Components/HeaderDashboard.tsx`

### 4.1. Double navigation in `handleNavigation`

- **Code**:

```84:89:Components/HeaderDashboard.tsx
  const handleNavigation = () => {
    if (currPackage.is_active) {
      router.push("/dashboard/taskCenter");
    }
    router.push("/dashboard/package-lists");
  };
```

- **What’s wrong**:
  - When `currPackage.is_active` is true:
    - First navigates to `/dashboard/taskCenter`
    - Then **immediately** navigates again to `/dashboard/package-lists`
  - This causes **two full route transitions** (incurring middleware + layout + page data fetching twice) for a single click.
- **Impact**:
  - Directly increases perceived slowness when clicking on the package badge, and adds unnecessary load to both your app and Supabase.

### 4.2. Extra Supabase calls from the client

- **Code**:

```37:47:Components/HeaderDashboard.tsx
  useEffect(() => {
    const supabase = createClient();
    let channel: any;

    async function load() {
      const res = await getActivePackage();
      ...
      channel = supabase
        .channel("user-packages-realtime")
        .on("postgres_changes", { ... }, (payload) => {
          setCurrPackage(payload.new);
        })
        .subscribe();
    }

    load();
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);
```

```73:82:Components/HeaderDashboard.tsx
  useEffect(() => {
    const getUserImage = async () => {
      const res = await getProfile();
      if (res && res?.success) {
        setUserImage(res.data.profile_img);
      }
    };
    getUserImage();
  }, []);
```

- **Why it’s bad**:
  - `getActivePackage()` is already being called server‑side in the dashboard layout; it’s being fetched **again** from the client in the header.
  - `getProfile()` is another Supabase query from the client on every dashboard load.
  - The realtime subscription is good for live updates but adds another Supabase connection that may be unnecessary for basic navigation.
  - Together, this header adds more network overhead to **every dashboard page**.

---

## 5. Global layout wrapper always fetching user on client

- **File**: `Components/LayoutWrapper.tsx`
- **Problem**:
  - On every initial client render, the app:
    - Hydrates
    - Calls `useUserStore.fetchUser()`, which:
      - Creates a Supabase client in the browser
      - Calls `supabase.auth.getUser()`
      - Registers a `supabase.auth.onAuthStateChange` listener
- **Code**:

```18:21:Components/LayoutWrapper.tsx
  useEffect(() => {
    setIsClient(true);
    fetchUser();
  }, [fetchUser]);
```

```21:37:store/index.ts
  fetchUser: async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    ...
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, loading: false });
    });
  },
```

- **Why it’s bad**:
  - This adds yet another Supabase auth call on top of:
    - Middleware `getUser`
    - Any server‑side calls to `auth.getSession` inside server actions
  - The listener is never explicitly unsubscribed (though the store is long‑lived), which is acceptable but not ideal.
  - While not the sole cause of 5s delays, it contributes to an overall heavy auth/identity footprint on initial page loads.

---

## 6. Server actions + Supabase heavily used from client components

- **Pattern**:
  - Many dashboard components use `"use client"` and then call server actions (which themselves call Supabase) from `useEffect` on mount.
  - Examples:
    - `DashboardHome`:
      - `getUserSession()`
      - `getUserWallet(userSession?.user?.id)`
      - `getTeamMembers()`
      - `getProducts()`
    - `HeaderDashboard`:
      - `getActivePackage()`
      - `getProfile()`
    - Wallet & profile pages fetch additional data in a similar style.
- **Why it’s bad**:
  - Each client-side mount triggers extra round‑trips to your Next server, which then hits Supabase.
  - Navigation between pages does not reuse server‑rendered data effectively; instead, you re‑fetch on the client again.
  - Combined with middleware and layout behavior, a single click can fan out into many Supabase calls.

---

## 7. Mobile dashboard layout ignores local menu content

- **File**: `app/dashboard/ClientLayout.tsx`
- **Code**:

```136:145:app/dashboard/ClientLayout.tsx
      <div className="md:hidden pb-20">
        <HeaderDashboard
          setMenuId={setMenuId}
          menuIId={menuIId}
          sidebarItems={restItems}
        />

        {children || menus[menuIId]}
      </div>
```

- **What’s wrong**:
  - In the App Router, `children` is almost always defined for a route, so `menus[menuIId]` is **never used**.
  - The local `menuId` state is only affecting styling, not which content is shown.
- **Impact**:
  - Not a direct performance bug, but it’s confusing architecture: the intent seems to be local tabbed navigation, but actual content is always driven by route changes (which are slower than local tab switching).

---

## 8. Miscellaneous smaller issues

- **Unnecessary console logs in production**:
  - Throughout the code (`DashboardHome`, wallet actions, etc.) there are `console.log` calls (`"user balance"`, `"Team Data:"`, `"products listed:"`, etc.).
  - Excessive logging can slightly affect performance and noise, especially in large lists or frequent renders.

- **No loading states for heavy data fetches**:
  - Several dashboard views make multiple async calls without showing clear skeletons/spinners tied to each request.
  - Users experience a “blank” or partially rendered screen for several seconds, which feels slower even when the actual network time isn’t extreme.

---

## Summary of Root Causes for Slow Menu Navigation

1. **Too many Supabase calls per navigation**:
   - Middleware auth + layout `getActivePackage()` + client server actions + header data fetch + global user fetch.
2. **Client components driving data fetching instead of server components**:
   - `useEffect` calling server actions after the page loads increases time‑to‑interactive and delays UI population.
3. **Double navigation in `HeaderDashboard.handleNavigation`**:
   - One click can cause two full route transitions (and all related data fetching) instead of one.

Addressing these areas (especially reducing redundant Supabase calls, moving more data fetching to server components with caching, and fixing the double navigation) should significantly reduce the 5s+ delays when clicking menu buttons.

---

## Cost Impact of Current Implementation

Even if Supabase and Next.js calls feel “free” in development, in production they directly translate into **higher usage and infrastructure costs**.

### 1. Supabase: redundant auth and data queries

- Every dashboard navigation includes multiple Supabase calls:
  - Auth in `middleware` (`auth.getUser`).
  - `getActivePackage` in `app/dashboard/layout.tsx`.
  - Additional queries via server actions from:
    - `DashboardHome` (`getUserSession`, `getUserWallet`, `getTeamMembers`, `getProducts`).
    - `HeaderDashboard` (`getActivePackage`, `getProfile`).
    - Wallet/profile and other dashboard pages.
- **Cost impact**:
  - Supabase pricing typically scales with:
    - Number of database reads/writes.
    - Auth requests.
    - Bandwidth (egress).
  - Redundant queries increase all three, so as traffic grows you pay **more per user session** than you would with shared/cached data.

### 2. Next.js server / hosting costs

- Double navigations (e.g. in `handleNavigation`) and extra server actions mean:
  - More route handlers and serverless functions invoked.
  - More compute time spent per click.
- **Cost impact**:
  - Hosting providers (e.g. Vercel) usually bill based on request count and execution time.
  - Unnecessary navigations and server actions directly increase your monthly hosting bill.

### 3. Realtime subscriptions overhead

- `HeaderDashboard` opens a Supabase realtime channel (`user-packages-realtime`) for every dashboard session.
- **Cost impact**:
  - Realtime features are often priced by:
    - Concurrent connections.
    - Messages delivered.
  - If many users are online, keeping realtime channels open when they’re not strictly needed can noticeably raise realtime usage (and therefore cost).

### 4. Client-side Supabase usage

- The global `LayoutWrapper` and several components create Supabase clients in the browser and call:
  - `supabase.auth.getUser()`
  - Various table queries via server actions.
- **Cost impact**:
  - Browser-originated queries still count as billable operations.
  - Because they are triggered on each mount/navigation, you end up with **more billable operations per user** than necessary.

### 5. Aggregate effect at scale

- Per user, this looks like “just a few extra calls,” but multiplied by:
  - Daily active users,
  - Navigations per session,
  - Number of dashboard sections visited,
- …the current patterns can result in:
  - Significantly higher Supabase database + auth + realtime usage.
  - More serverless invocations and compute time on your hosting provider.

Optimizing navigation (removing double navigations, consolidating Supabase calls, moving more logic into shared server layouts and caching) will not only make the app feel faster but also **reduce your recurring infrastructure and database costs** as usage grows.

