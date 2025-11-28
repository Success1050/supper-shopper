// app/dashboard/package-lists/page.tsx
import { getActivePackage } from "@/app/actions/getActivePackage";
import { redirect } from "next/navigation";
import PackageSelectionClient from "./PackageSelectionClient";

export default async function PackageListPage() {
  const activePackage = await getActivePackage();

  if (activePackage?.data?.is_active) {
    redirect("/dashboard");
  } else {
    return <PackageSelectionClient />;
  }
}
