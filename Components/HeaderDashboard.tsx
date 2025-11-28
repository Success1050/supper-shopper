"use client";

import { getActivePackage } from "@/app/actions/getActivePackage";
import { getProfile, getUserProfile } from "@/app/dashboard/profile/actions";
import { Bell, HelpCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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
  setMenuId?: (id: number) => void;
  menuIId?: number;
  sidebarItems?: SidebarItem[];
}) => {
  const [userImage, setUserImage] = useState<string>("");
  const [currPackage, setCurrPackage] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const fetchUserPackage = async () => {
      const res = await getActivePackage();
      if (res && res.success) {
        console.log("the man", res.data);
        setCurrPackage(res.data);

        // START realtime listener
        const channel = supabase
          .channel("user-packages-realtime")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "user_packages",
              filter: `user_id=eq.${res.userId}`,
            },
            (payload) => {
              console.log("Realtime update:", payload);
              setCurrPackage(payload.new);
            }
          )
          .subscribe();

        // Cleanup when component unmounts
        return () => {
          supabase.removeChannel(channel);
        };
      }
    };

    fetchUserPackage();
  }, []);

  useEffect(() => {
    const getUserImage = async () => {
      const res = await getProfile();

      if (res && res?.success) {
        setUserImage(res.data.profile_img);
      }
    };
    getUserImage();
  }, []);

  const handleNavigation = () => {
    if (currPackage.is_active) {
      router.push("/dashboard/taskCenter");
    }
    router.push("/dashboard/package-lists");
  };
  return (
    <>
      <div className="w-full p-3 bg-[#201d4c]">
        <div className="hidden md:flex items-center justify-between mb-6 p-2.5 rounded-b-lg bg-[#2d2c54]">
          <div className="w-fit px-6 py-2 flex justify-center items-center bg-[#403f65] rounded-[42px]">
            <h2
              className="text-white text-[16px] font-bold cursor-pointer"
              onClick={handleNavigation}
            >
              {currPackage?.is_active
                ? currPackage?.packages?.plan_name
                : "No active package"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Bell
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
        <div className="flex items-center justify-between md:hidden mb-6 mt-2">
          <Image
            src={"/groupLogo.png"}
            height={500}
            width={500}
            className="w-[106px] h-auto"
            alt="logo"
          />
          <div className="flex items-center justify-between gap-5">
            <div className="w-fit py-2 px-6 flex justify-center items-center bg-[#403f65] rounded-[42px]">
              <h2 className="text-white text-[16px]">Starter</h2>
            </div>
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
          <nav className="flex  items-center w-[100%] justify-center gap-6">
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
      </div>
    </>
  );
};

export default HeaderDashboard;
