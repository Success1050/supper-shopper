"use client";

import Image from "next/image";
import React, { ReactNode, useState } from "react";
import {
  Home,
  TestTube,
  Users,
  Wallet,
  FileText,
  LogOut,
  PackageIcon,
  Bell,
  ClipboardPen,
} from "lucide-react";
import HeaderDashboard from "@/Components/HeaderDashboard";
import Link from "next/link";

import DashboardHome from "@/Components/Home";
import TaskCenter from "@/Components/TaskCenter";
import MyTeam from "@/Components/MyTeam";
import MyBalanceDeposit from "@/Components/WalletDeposit";
import Records from "@/Components/Records";
import PackageSelection from "@/Components/PackageSelection";

import { handleLogout } from "@/Components/LogoutFunc";

interface NavItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  url: string;
}

interface ClientLayoutProps {
  children: ReactNode;
  activePackage: any | null; // now includes data & userId
}

const ClientLayout = ({ children, activePackage }: ClientLayoutProps) => {
  const [menuIId, setMenuId] = useState<number>(0);

  // Desktop Sidebar Items
  const sidebarItems: NavItem[] = [
    {
      icon: PackageIcon,
      label: "All Packages",
      url: "/dashboard/package-lists",
    },
    { icon: Home, label: "Home", url: "/dashboard" },
    {
      icon: ClipboardPen,
      label: "Task Center",
      url: "/dashboard/taskCenter",
    },
    { icon: Users, label: "My Team", url: "/dashboard/myTeam" },
    { icon: Wallet, label: "Wallet", url: "/dashboard/wallet" },
    { icon: FileText, label: "Record", url: "/dashboard/records" },
  ];

  // Mobile Items
  const mobileNavItems: NavItem[] = [
    {
      icon: PackageIcon,
      label: "All Packages",
      url: "/dashboard/package-lists",
    },
    { icon: Home, label: "Home", url: "/dashboard" },
    { icon: Bell, label: "Notification", url: "/dashboard/notifications" },
  ];

  const [firstItems, ...restItems] = sidebarItems;

  const menus = [
    <PackageSelection key="packages" />,
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
        <div className="w-64 min-h-screen bg-[#2d2c54] px-3 pt-5 items-start relative">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 w-[172px] h-auto">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={300}
              height={300}
              className=" w-full h-full"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2 w-full ">
            {sidebarItems.map((item, index) => (
              <Link href={item.url} key={index}>
                <div
                  onClick={() => setMenuId(index)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full cursor-pointer ${
                    index === menuIId
                      ? "bg-[#263bf6] text-white"
                      : "text-white hover:bg-blue-700/50 bg-[#343758]"
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
              className="flex items-center gap-3 rounded-lg cursor-pointer text-blue-200 px-3 py-3 bg-[#2723FF] hover:bg-blue-700/50 hover:text-white transition-colors w-[50%]"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span className="font-medium">Log out</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#201d4c]">
          <HeaderDashboard setMenuId={setMenuId} menuIId={menuIId} />
          {children}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden pb-20">
        <HeaderDashboard
          setMenuId={setMenuId}
          menuIId={menuIId}
          sidebarItems={restItems}
        />

        {children || menus[menuIId]}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#3B3A61] backdrop-blur-sm md:hidden py-1 z-10">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item, index) => (
            <Link href={item.url} key={index}>
              <div
                onClick={() => setMenuId(index)}
                className={`flex flex-col items-center px-3 py-2 ${
                  index === menuIId
                    ? "bg-[#2622fb] rounded-full text-white"
                    : "text-white"
                }`}
              >
                <item.icon size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
