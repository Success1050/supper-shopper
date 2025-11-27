import { ReactNode } from "react";
import { getActivePackage } from "../actions/getActivePackage";
import ClientLayout from "./ClientLayout";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const activePackage = await getActivePackage();

  return <ClientLayout activePackage={activePackage}>{children}</ClientLayout>;
}
