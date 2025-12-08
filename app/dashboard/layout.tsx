import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";
import AuthInitializer from "@/Components/AuthInitializer";
import { createClient } from "@/utils/supabase/server";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <ClientLayout session={session}>
      {/* <AuthInitializer /> */}
      {children}
    </ClientLayout>
  );
}
