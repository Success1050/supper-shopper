"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Home,
  TestTube,
  Users,
  Wallet,
  FileText,
  LogOut,
  PackageIcon,
  Bell,
} from "lucide-react";
import HeaderDashboard from "@/Components/HeaderDashboard";
import Link from "next/link";

// Mobile imports
import DashboardHome from "@/Components/Home";
import TaskCenter from "@/Components/TaskCenter";
import MyTeam from "@/Components/MyTeam";
import MyBalanceDeposit from "@/Components/WalletDeposit";
import Records from "@/Components/Records";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { handleLogout } from "@/Components/LogoutFunc";
import PackageSelection from "@/Components/PackageSelection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuIId, setMenuId] = useState<number>(0);

  // Sidebar for desktop
  const sidebarItems = [
    {
      icon: PackageIcon,
      label: "All Packages",
      active: true,
      url: "/dashboard/package-lists",
    },
    { icon: Home, label: "Home", url: "/dashboard" },
    { icon: TestTube, label: "Task Center", url: "/dashboard/taskCenter" },
    { icon: Users, label: "My Team", url: "/dashboard/myTeam" },
    { icon: Wallet, label: "Wallet", url: "/dashboard/wallet" },
    { icon: FileText, label: "Record", url: "/dashboard/records" },
  ];

  const mobileNavItems = [
    {
      icon: PackageIcon,
      label: "All Packages",
      active: true,
      url: "/dashboard/package-lists",
    },
    { icon: Home, label: "Home", url: "/dashboard" },
    { icon: Bell, label: "Notification", url: "/dashboard/notifications" },
  ];

  // Mobile menu content
  const menus = [
    <PackageSelection key="package-listss" />,
    <DashboardHome key="home" />,
    <TaskCenter key="tasks" />,
    <MyTeam key="team" />,
    <MyBalanceDeposit key="wallet" />,
    <Records key="records" />,
  ];

  return (
    <div className="min-h-screen bg-[#201d4c]">
      {/* Desktop Layout */}
      <div className="hidden md:flex ">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[#2d2c54] px-3 pt-5 items-start relative">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 w-[172px] h-auto">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={300}
              height={300}
              className="rounded-full w-full h-full"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2 w-full ">
            {sidebarItems.map((item, index) => (
              <Link href={item.url} key={index}>
                <div
                  onClick={() => setMenuId(index)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors w-full ${
                    index === menuIId
                      ? "bg-[#263bf6] text-white"
                      : "text-blue-200 hover:bg-blue-700/50 bg-[#343758] hover:text-white"
                  }`}
                >
                  <item.icon size={20} className="text-[#fff]" />
                  <span className="font-medium text-[#fff]">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-[10%] w-full">
            <div
              className="flex items-center gap-3 rounded-lg cursor-pointer text-blue-200 px-3 py-3 bg-blue-600 hover:bg-blue-700/50 hover:text-white transition-colors w-[50%]"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span className="font-medium">Log out</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#2623fd]">
          <HeaderDashboard setMenuId={setMenuId} menuIId={menuIId} />
          {children}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden pb-20">
        <HeaderDashboard
          setMenuId={setMenuId}
          menuIId={menuIId}
          sidebarItems={sidebarItems}
        />

        {children || menus[menuIId]}
      </div>

      {/* Bottom Navigation (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#3B3A61] backdrop-blur-sm md:hidden py-1">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item, index) => (
            <Link href={item.url} key={index}>
              <div
                onClick={() => setMenuId(index)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  index === menuIId
                    ? "bg-[#2622fb] p-5 flex justify-center items-center rounded-full text-white"
                    : "text-blue-300"
                }`}
              >
                <item.icon size={20} color="white" />
                {/* <span className="text-xs mt-1 font-medium">{item.label}</span> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
