"use client";

import { usePathname } from "next/navigation";
import Header from "@/Sections/Header";
import Footer from "@/Sections/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // exact routes
  const noHeaderExactRoutes = ["/login", "/register"];

  // routes that disable header for all subpaths
  const noHeaderPrefixRoutes = ["/dashboard"];

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
