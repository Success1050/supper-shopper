"use client";

import { getProfile, getUserProfile } from "@/app/dashboard/profile/actions";
import { Bell, HelpCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  url: string;
  active?: boolean;
};

const HeaderDashboard = ({
  setMenuId,
  menuIId,
  sidebarItems,
}: {
  menuIId?: number;
  setMenuId?: (id: number) => void;
  sidebarItems?: SidebarItem[];
}) => {
  const [userImage, setUserImage] = useState<string>("");

  useEffect(() => {
    const getUserImage = async () => {
      const res = await getProfile();

      if (res && res?.success) {
        setUserImage(res.data.profile_img);
      }
    };
    getUserImage();
  }, []);
  return (
    <>
      <div className="w-full p-3 bg-[#201d4c]">
        <div className="flex items-center justify-between mb-6 p-2.5 rounded-b-lg bg-[#2d2c54]">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell
              className="text-white cursor-pointer hover:text-blue-200"
              size={24}
            />
            <HelpCircle
              className="text-white cursor-pointer hover:text-blue-200"
              size={24}
            />
            <Settings
              className="text-white cursor-pointer hover:text-blue-200"
              size={24}
            />
            <Link href={"/dashboard/profile"}>
              <div className="w-[60px] h-[60px] rounded-full bg-orange-400 flex items-center justify-center">
                <img
                  src={userImage || "/images/user.png"}
                  alt="User"
                  width={56}
                  height={56}
                  className="rounded-full w-full h-full"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="md:hidden mb-6 p-0">
          <nav className="flex  items-center w-[100%] gap-6">
            {sidebarItems?.map((item, index) => (
              <Link href={item.url} key={index}>
                <button
                  onClick={() => setMenuId && setMenuId(index)}
                  className={`w-fit px-[5px] text-center py-2 rounded-md text-[10px] font-medium transition-all duration-200 border border-[#FFFFFF1A] ${
                    menuIId === index
                      ? "bg-white text-indigo-900 shadow-sm"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </nav>
        </div>
        {/* <div className="bg-purple-700/50 rounded-lg p-4 mb-4 mx-4 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">UK</span>
            </div>
            <span className="text-white">emma***@gmail.com</span>
          </div>

          <span className="text-green-300 font-semibold">$120.00</span>
        </div> */}
      </div>
    </>
  );
};

export default HeaderDashboard;
