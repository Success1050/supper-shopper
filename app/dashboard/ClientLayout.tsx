"use client";

import Image from "next/image";
import React, { ReactNode, useState, useEffect } from "react";
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
import { usePathname } from "next/navigation";

import DashboardHome from "@/Components/Home";
import TaskCenter from "@/Components/TaskCenter";
import MyTeam from "@/Components/MyTeam";
import MyBalanceDeposit from "@/Components/WalletDeposit";
import Records from "@/Components/Records";
import PackageSelection from "@/Components/PackageSelection";

import { handleLogout } from "@/Components/LogoutFunc";
import { ClientLayoutProps } from "@/type";
import { mobileNavItems, sidebarItems } from "@/constants";

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [currentRoute, setCurrentRoute] = useState(pathname);

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);

  // update when actual path changes
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const activeMenuIndex = sidebarItems.findIndex(
    (item) => item.url === pathname
  );
  const menuIId = activeMenuIndex !== -1 ? activeMenuIndex : 1; //

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
                  onClick={() => setActive(item.url)} // 👈 instant update
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full cursor-pointer ${
                    active === item.url
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
          <HeaderDashboard menuIId={menuIId} />

          {(() => {
            const menuIndex = sidebarItems.findIndex(
              (item) => item.url === currentRoute
            );
            // If route matches a sidebar item, show menu component, otherwise show children
            return menuIndex !== -1 ? menus[menuIndex] : children;
          })()}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden pb-20">
        <HeaderDashboard menuIId={menuIId} sidebarItems={restItems} />

        {(() => {
          const menuIndex = sidebarItems.findIndex(
            (item) => item.url === currentRoute
          );
          // If route matches a sidebar item, show menu component, otherwise show children
          return menuIndex !== -1 ? menus[menuIndex] : children;
        })()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#3B3A61] backdrop-blur-sm md:hidden py-1 z-10">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item, index) => (
            <Link href={item.url} key={index}>
              <div
                onClick={() => setActive(item.url)} // 👈 instant update
                className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full cursor-pointer ${
                  active === item.url
                    ? "bg-[#263bf6] text-white"
                    : "text-white hover:bg-blue-700/50 bg-[#343758]"
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
