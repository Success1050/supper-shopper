"use client";

import { usePathname } from "next/navigation";
import Header from "@/Sections/Header";
import Footer from "@/Sections/Footer";
import { useUserStore } from "@/store";
import { useEffect, useState } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchUser();
  }, [fetchUser]);

  // Exact routes - NO HEADER (they have their own custom headers)
  const noHeaderExactRoutes = ["/login", "/signup", "/"];

  // Routes that disable header for all subpaths
  const noHeaderPrefixRoutes = ["/dashboard", "/admin-dashboard"];

  const shouldHideHeader =
    noHeaderExactRoutes.includes(pathname) ||
    noHeaderPrefixRoutes.some((route) => pathname.startsWith(route));

  // Prevent header flash during hydration - only render children initially
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
      {!shouldHideHeader && <Footer />}
    </>
  );
}
