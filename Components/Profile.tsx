"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, LogOut, Edit, Router, Camera } from "lucide-react";
import { handleLogout } from "./LogoutFunc";
import { useTransition } from "react";
import { Loader } from "./Loader";
import { getProducts } from "@/app/dashboard/taskCenter/action";
import {
  getProfile,
  getUserProfile,
  uploadProfileImage,
} from "@/app/dashboard/profile/actions";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/app/dashboard/reset/action";

interface ProfileTypes {
  id: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  mobilenumber: string;
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
  const [profile, setProfile] = useState<ProfileTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [editUserProfile, seteditUserProfile] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getProfile();
      if (!res || !res.success) {
        console.log("An error occurred");
        return;
      }

      setProfile(res.data);
      console.log(res.data);
      console.log("profile state", profile);

      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    router.push(`/dashboard/edit-profile/${profile?.id}`);
  };

  useEffect(() => {
    const handleEdit = async () => {
      const res = await getUserProfile(profile?.id);
      if (!res.success) {
        console.log(res.message);
        return;
      }
      seteditUserProfile(res.data.profile_img ?? null);
      setPreviewUrl(res.data.profile_img ?? null);
    };
    handleEdit();
  }, [profile?.id]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    const res = await uploadProfileImage(profile?.id, file);
    if (res.success && res.url) {
      setPreviewUrl(res.url);
      seteditUserProfile(res.url);
      alert("Profile photo updated!");
    } else {
      alert(res.message ?? "Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen bg-[#201d4c] p-2 px-6 ">
      <div>
        <div className="bg-[#2b2a54] backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={
                    previewUrl ||
                    editUserProfile ||
                    "https://placehold.co/100x100?text=No+Photo"
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-700/50"
                />
              </div>

              {/* User Info */}
              <div className="flex flex-col">
                <h2 className="text-white text-[16px] font-semibold ">
                  {profile?.first_name}
                </h2>
                <p className="text-[#fff] text-[12px]">
                  {profile?.email || "null"}
                </p>
                <p className="text-[#fff] text-[12px]">
                  {profile?.phone || "null"}
                </p>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              {/* Edit Data Button */}
              <button
                onClick={handleEdit}
                className="bg-[#2723FF] hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-900/30"
              >
                Edit Data
              </button>

              {/* Upload Photo Button */}
              <label className="bg-slate-700/50 hover:bg-slate-700 active:bg-slate-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 border border-slate-600/50">
                <h2 className="text-sm text-white whitespace-nowrap">
                  Upload Photo
                </h2>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mb-6 mt-6">
          <h3 className="text-white font-semibold text-lg mb-6">
            Personal Info
          </h3>

          <div className="bg-[#2b2954] backdrop-blur-sm rounded-2xl p-6 border border-[#2b2954]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Full Name</span>
                <span className="text-white">
                  {profile?.first_name} {profile?.last_name || "null"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Phone Number</span>
                <span className="text-white">
                  {profile?.mobilenumber || "null"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Gender</span>
                <span className="text-white"> {profile?.gender || "null"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Country / Region</span>
                <span className="text-white">{profile?.country || "null"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white text-sm">
                  Referral Code / Inviter ID
                </span>
                <span className="text-white">
                  {profile?.personal_referral_code || "null"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account & Security - First Section */}
        <div className="mb-6">
          <div className="px-6 py-5 border-b border-slate-700/30">
            <h1 className="text-white text-xl font-semibold">
              Account & Security
            </h1>
          </div>

          <div className="bg-[#2b2a54] backdrop-blur-sm rounded-2xl border border-slate-700/30 shadow-2xl overflow-hidden">
            <div className="p-4">
              <div
                className="w-full flex items-center justify-between px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group"
                onClick={() => router.push("/dashboard/reset")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-white group-hover:text-white transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">
                    Change Password
                  </span>
                </div>
                <button className="text-white group-hover:text-white transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Wallet Address 2FA */}
              <div
                className="w-full flex items-center justify-between px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group mt-1"
                onClick={() => router.push("/dashboard/wallet-address")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-white group-hover:text-white transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">
                    Wallet Adress 2FA
                  </span>
                </div>
                <button className="text-white transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Theme */}
              {/* <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group mt-1">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-white group-hover:text-white transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Theme</span>
                </div>
                <button className="text-white text-sm">Dark/Light</button>
              </div> */}

              {/* Two-Factor Authentication */}
              <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group mt-1">
                <span className="text-white text-sm font-medium">
                  Two-Factor Authentication
                </span>
                <button className="text-white transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final Account & Security Section */}
        <div className="mb-6">
          <h3 className="text-white font-semibold text-lg mb-6 hidden md:block">
            Account & Security
          </h3>
          <div className="bg-[#2b2a54] backdrop-blur-sm rounded-2xl p-6 border border-[#2b2954]">
            <div className="space-y-2 mb-6">
              <div
                className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors"
                onClick={() => router.push("/dashboard/support")}
              >
                <span className="text-white">Help & Support</span>
                <ChevronRight className="text-white w-5 h-5" />
              </div>

              <div className="flex items-center justify-between py-3 hover:bg-blue-700/20 rounded-lg px-2 cursor-pointer transition-colors">
                <span className="text-white">Privacy Policy</span>
                <ChevronRight className="text-white w-5 h-5" />
              </div>
            </div>

            <button
              onClick={() => startTransition(() => handleLogout())}
              className="w-full bg-[#2723FF] hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
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
      </div>
    </div>
  );
};

export default ProfileSettings;
