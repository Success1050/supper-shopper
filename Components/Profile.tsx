"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, LogOut, Edit, Router } from "lucide-react";
import { handleLogout } from "./LogoutFunc";
import { useTransition } from "react";
import { Loader } from "./Loader";
import { getProducts } from "@/app/dashboard/taskCenter/action";
import { getProfile } from "@/app/dashboard/profile/actions";
import { useRouter } from "next/navigation";

interface ProfileTypes {
  id: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  profile_img: string;
  dob: string;
  gender: string;
  first_name: string;
  last_name: string;
  personal_referral_code: string;
}

const ProfileSettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  const [profile, setProfile] = useState<ProfileTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getProfile();
      if (!res || !res.success) {
        console.log("An error occurred");
        return;
      }
      // console.log(res.data);

      setProfile(res.data);
      console.log(res.data);
      console.log("profile state", profile);

      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    router.push(`/dashboard/edit-profile/${profile?.id}`);
    // alert("Edit profile functionality");
  };

  return (
    <div className="min-h-screen bg-[#201d4c] p-6">
      <div>
        {/* Profile Header */}
        <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954] mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16">
                <img
                  src={profile?.profile_img || "null"}
                  alt="John Doe"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">{}</h2>
                <div className="text-blue-200 text-sm">
                  {profile?.email || "null"}
                </div>
                <div className="text-blue-200 text-sm">
                  {profile?.phone || "null"}
                </div>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="text-blue-300 hover:text-white transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954] mb-6">
          <h3 className="text-white font-semibold text-lg mb-6">
            Personal Info
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Full Name</span>
              <span className="text-white">
                {profile?.first_name} {profile?.last_name || "null"}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Date Of Birth</span>
              <span className="text-white">{profile?.dob || "null"}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Gender</span>
              <span className="text-white"> {profile?.gender || "null"}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Country / Region</span>
              <span className="text-white">{profile?.country || "null"}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">City</span>
              <span className="text-white">{profile?.city || "null"}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Address</span>
              <span className="text-white">{profile?.address || "null"}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">
                Referral Code / Inviter ID
              </span>
              <span className="text-white">
                {profile?.personal_referral_code || "null"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row flex-1 gap-3">
          {/* Account & Security - First Section */}
          <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954] mb-6 flex-1">
            <h3 className="text-white font-semibold text-lg mb-6">
              Account & Security
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors">
                <span className="text-white">Change Password</span>
                <ChevronRight className="text-blue-300 w-5 h-5" />
              </div>

              <div className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors">
                <span className="text-white">Payment & Security</span>
                <ChevronRight className="text-blue-300 w-5 h-5" />
              </div>

              <div className="flex items-center justify-between py-3 px-2">
                <span className="text-white">Two-Factor Authentication</span>
                <div
                  className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                    twoFactorEnabled ? "bg-blue-600" : "bg-gray-600"
                  }`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      twoFactorEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Account & Security - Second Section */}
          <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954] mb-6 flex-1">
            <h3 className="text-white font-semibold text-lg mb-6">
              Account & Security
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Change Password</span>
                </div>
                <ChevronRight className="text-blue-300 w-5 h-5" />
              </div>

              <div className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Wallet Address A</span>
                </div>
                <ChevronRight className="text-blue-300 w-5 h-5" />
              </div>

              <div className="flex items-center justify-between py-3 px-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Theme</span>
                </div>
                <span className="text-blue-200">Dark/Light</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Account & Security Section */}
        <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954] mb-6">
          <h3 className="text-white font-semibold text-lg mb-6">
            Account & Security
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors">
              <span className="text-white">Help & Support</span>
              <ChevronRight className="text-blue-300 w-5 h-5" />
            </div>

            <div className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors">
              <span className="text-white">Privacy Policy</span>
              <ChevronRight className="text-blue-300 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => startTransition(() => handleLogout())}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
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
    </div>
  );
};

export default ProfileSettings;
