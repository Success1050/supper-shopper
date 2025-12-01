import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";
import AuthInitializer from "@/Components/AuthInitializer";
interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <ClientLayout>
      {/* <AuthInitializer /> */}
      {children}
    </ClientLayout>
  );
}
