"use client";

import Image from "next/image";
import React, { useState, useTransition } from "react";
import {
  Home,
  TestTube,
  Users,
  Wallet,
  FileText,
  LogOut,
  PackageIcon,
  Bell,
  ListTodo,
  UserPlus,
  ShieldCheck,
  Ticket,
  MessageCircle,
  FileSearch,
  PieChart,
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
import { useLogout } from "@/Components/LogoutFunc";
import PackageSelection from "@/Components/PackageSelection";
import { Loader } from "@/Components/Loader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuIId, setMenuId] = useState<number>(0);
   const [isPending, startTransition] = useTransition();
  const logout= useLogout()

  // Sidebar for desktop
  const sidebarItems = [
    {
      icon: Home,
      label: "Overview",
      active: true,
      url: "/admin-dashboard",
    },
    { icon: Users, label: "Users", url: "/admin-dashboard/users" },
    { icon: ListTodo, label: "Tasks", url: "/admin-dashboard/tasks" },
    { icon: Wallet, label: "Payouts", url: "/admin-dashboard/payouts" },
    { icon: UserPlus, label: "Affiliate", url: "/admin-dashboard/affiliate" },
    { icon: FileText, label: "Reports", url: "/admin-dashboard/reports" },
    {
      icon: ShieldCheck,
      label: "Roles & Permission",
      url: "/admin-dashboard/rules",
    },

    // SUPORTS

    {
      icon: Ticket,
      label: "Tickets",
      url: "/admin-dashboard/tickets",
    },

    {
      icon: MessageCircle,
      label: "Live Chats",
      url: "/admin-dashboard/live-chats",
    },

    {
      icon: FileSearch,
      label: "Knowledge Base",
      url: "/admin-dashboard/Knowledge-base",
    },

    {
      icon: PieChart,
      label: "Analytics",
      url: "/admin-dashboard/analytics",
    },
  ];

  const mobileNavItems = [
    {
      icon: Home,
      label: "Overview",
      active: true,
      url: "/admin-dashboard",
    },
    { icon: Users, label: "Users", url: "/admin-dashboard/users" },
    { icon: ListTodo, label: "Tasks", url: "/admin-dashboard/tasks" },
    { icon: Wallet, label: "Payouts", url: "/admin-dashboard/payouts" },
    { icon: UserPlus, label: "Affiliate", url: "/admin-dashboard/affiliate" },
    { icon: FileText, label: "Reports", url: "/admin-dashboard/reports" },
  ];

  // const [firstItems, ...restItems] = sidebarItems;

  // Mobile menu content
  // const menus = [
  //   <PackageSelection key="package-listss" />,
  //   <DashboardHome key="home" />,
  //   <TaskCenter key="tasks" />,
  //   <MyTeam key="team" />,
  //   <MyBalanceDeposit key="wallet" />,
  //   <Records key="records" />,
  // ];

  return (
    <div className="min-h-screen bg-[#201d4c]">
      {/* Desktop Layout */}
      <div className="hidden md:flex ">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[#2d2c54] px-3 py-5 items-start relative">
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
            {sidebarItems.slice(0, 7).map((item, index) => (
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
            <h4 className="text-[14px] font-normal text-white my-5">Support</h4>
            {sidebarItems.slice(7).map((item, index) => {
              const realIndex = index + 7; // 🔥 Correct index for support items

              return (
                <Link href={item.url} key={realIndex}>
                  <div
                    onClick={() => setMenuId(realIndex)} // 🔥 use real index
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors w-full ${
                      realIndex === menuIId // 🔥 compare realIndex
                        ? "bg-[#263bf6] text-white"
                        : "text-blue-200 hover:bg-blue-700/50 bg-[#343758] hover:text-white"
                    }`}
                  >
                    <item.icon size={20} className="text-[#fff]" />
                    <span className="font-medium text-[#fff]">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            className="flex items-center justify-center gap-3 rounded-lg cursor-pointer text-blue-200 px-3 my-2 py-3 mt-[50%] bg-[#2723FF] hover:bg-blue-700/50 hover:text-white transition-colors w-full"
            onClick={() => startTransition(() => logout())}
          >
           {isPending ? (
                         <Loader />
                       ) : (
                         <>
                           <LogOut className="w-5 h-5" />
                           <span>Logout</span>
                         </>
                       )}
          </button>
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
          sidebarItems={mobileNavItems}
        />

        {children}
      </div>

      {/* Bottom Navigation (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#3B3A61] backdrop-blur-sm md:hidden py-1 z-10">
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
