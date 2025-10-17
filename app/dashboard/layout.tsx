"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Home, TestTube, Users, Wallet, FileText, LogOut } from "lucide-react";
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuIId, setMenuId] = useState<number>(0);

  // Sidebar for desktop
  const sidebarItems = [
    { icon: Home, label: "Home", active: true, url: "/dashboard" },
    { icon: TestTube, label: "Task Center", url: "/dashboard/taskCenter" },
    { icon: Users, label: "My Team", url: "/dashboard/myTeam" },
    { icon: Wallet, label: "Wallet", url: "/dashboard/wallet" },
    { icon: FileText, label: "Record", url: "/dashboard/records" },
  ];

  // Bottom nav for mobile
  const mobileNavItems = [
    { icon: Home, label: "Home" },
    { icon: TestTube, label: "Test Center" },
    { icon: Users, label: "My Team" },
    { icon: Wallet, label: "Wallet" },
    { icon: FileText, label: "Record" },
  ];

  // Mobile menu content
  const menus = [
    <DashboardHome key="home" />,
    <TaskCenter key="tasks" />,
    <MyTeam key="team" />,
    <MyBalanceDeposit key="wallet" />,
    <Records key="records" />,
  ];

  return (
    <div className="min-h-screen bg-[#2623fd]">
      {/* Desktop Layout */}
      <div className="hidden md:flex ">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[#2623fd] px-3 items-start relative">
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
                      ? "bg-blue-600 text-white"
                      : "text-blue-200 hover:bg-blue-700/50 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
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
      <div className="fixed bottom-0 left-0 right-0 bg-[#2623fd] backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item, index) => (
            <Link href={sidebarItems[index].url} key={index}>
              <div
                onClick={() => setMenuId(index)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  index === menuIId ? "text-white" : "text-blue-300"
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
