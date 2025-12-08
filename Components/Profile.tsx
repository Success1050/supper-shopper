"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronRight, LogOut } from "lucide-react";
import { useLogout } from "./LogoutFunc";
import { useTransition } from "react";
import { Loader } from "./Loader";
import {
  getProfile,
  uploadProfileImage,
} from "@/app/dashboard/profile/actions";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { ProfileTypes } from "@/type";

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<ProfileTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [editUserProfile, seteditUserProfile] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.userId);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    if (!userId) return;
    const fetchUserProfile = async () => {
      try {
        const res = await getProfile(userId ?? undefined);
        if (!res || !res.success) {
          console.log("An error occurred");
          setLoading(false);
          return;
        }

        setProfile(res.data);
        // Set profile image immediately from initial data
        const profileImg = res.data.profile_img ?? null;
        seteditUserProfile(profileImg);
        setPreviewUrl(profileImg);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Optimized: Memoized edit handler
  const handleEdit = useCallback(() => {
    if (profile?.id) {
      router.push(`/dashboard/edit-profile/${profile.id}`);
    }
  }, [profile?.id, router]);

  const handlePhotoChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !profile?.id) return;

      // Immediate UI feedback
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      try {
        const res = await uploadProfileImage(profile.id, file);
        if (res.success && res.url) {
          setPreviewUrl(res.url);
          seteditUserProfile(res.url);
          alert("Profile photo updated!");
        } else {
          // Revert to previous image on failure
          setPreviewUrl(editUserProfile);
          alert(res.message ?? "Failed to upload image");
        }
      } catch (error) {
        setPreviewUrl(editUserProfile);
        alert("Failed to upload image");
      }
    },
    [profile?.id, editUserProfile]
  );

  const logout = useLogout();

  // Optimized: Memoized navigation handlers
  const navigateToReset = useCallback(() => {
    router.push("/dashboard/reset");
  }, [router]);

  const navigateToWallet = useCallback(() => {
    router.push("/dashboard/wallet-address");
  }, [router]);

  const navigateToSupport = useCallback(() => {
    router.push("/dashboard/support");
  }, [router]);

  // Optimized: Memoized profile image source
  const profileImageSrc = useMemo(() => {
    return (
      previewUrl ||
      editUserProfile ||
      "https://placehold.co/100x100?text=No+Photo"
    );
  }, [previewUrl, editUserProfile]);

  // Show skeleton loader while loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#201d4c] p-2 px-6 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#201d4c] p-2 px-6 ">
      <div>
        <div className="bg-[#2b2a54] backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profileImageSrc}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-700/50"
                  loading="lazy"
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
                  Rank: #{profile?.country_rank || 0}
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
              <label className="bg-slate-700/50 hover:bg-slate-700 active:bg-slate-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 border border-slate-600/50 cursor-pointer">
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
                className="w-full flex items-center justify-between px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group cursor-pointer"
                onClick={navigateToReset}
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
                className="w-full flex items-center justify-between px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group mt-1 cursor-pointer"
                onClick={navigateToWallet}
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
                onClick={navigateToSupport}
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
              onClick={() => startTransition(() => logout())}
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
