"use client";

import { usePathname } from "next/navigation";
import Header from "@/Sections/Header";
import Footer from "@/Sections/Footer";
import { useUserStore } from "@/store";
import { useEffect } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    fetchUser();
  }, [user]);
  const pathname = usePathname();

  // exact routes
  const noHeaderExactRoutes = ["/login", "/signup"];

  // routes that disable header for all subpaths
  const noHeaderPrefixRoutes = ["/dashboard", "/admin-dashboard"];

  const shouldHideHeader =
    noHeaderExactRoutes.includes(pathname) ||
    noHeaderPrefixRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
      {!shouldHideHeader && <Footer />}
    </>
  );
}
