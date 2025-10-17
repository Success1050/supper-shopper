"use client";

import { useEffect, useState, useTransition } from "react";
import { Camera } from "lucide-react";
import {
  getUserProfile,
  saveProfile,
  uploadProfileImage,
} from "@/app/dashboard/profile/actions";
import { Loader } from "./Loader";

export interface UserProfileTypes {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  postalCode: string;
  country: string;
  mobilenumber: string;
  email: string;
  profile_img?: string;
}

export default function EditProfile({
  profileId,
}: {
  profileId: string | undefined;
}) {
  const [editUserProfile, seteditUserProfile] =
    useState<UserProfileTypes | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleEdit = async () => {
      const res = await getUserProfile(profileId);
      if (!res.success) {
        alert(res.message);
        return;
      }
      seteditUserProfile(res.data);
      setPreviewUrl(res.data.profile_img ?? null);
    };
    handleEdit();
  }, [profileId]);

  const handleSave = async () => {
    setLoading(true);
    const res = await saveProfile(profileId, editUserProfile);
    if (!res.success) {
      console.log("failed to update");
      setLoading(false);
      return;
    }

    alert("Profile updated successfully");
    setLoading(false);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profileId) return;

    // Preview image before upload
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    const res = await uploadProfileImage(profileId, file);
    if (res.success && res.url) {
      setPreviewUrl(res.url);
      seteditUserProfile((prev) =>
        prev ? { ...prev, profile_img: res.url } : null
      );
      alert("Profile photo updated!");
    } else {
      alert(res.message ?? "Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
              <img
                src={
                  editUserProfile?.profile_img ||
                  "https://placehold.co/100x100?text=No+Photo"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-30 hover:bg-opacity-20 transition-all cursor-pointer">
            <Camera className="w-4 h-4" />
            <span className="text-sm">Change Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-white text-sm mb-2">Name</label>
            <input
              type="text"
              value={editUserProfile?.first_name ?? ""}
              onChange={(e) =>
                seteditUserProfile((prev) =>
                  prev ? { ...prev, first_name: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-white text-sm mb-2">Surname</label>
            <input
              type="text"
              value={editUserProfile?.last_name ?? ""}
              onChange={(e) =>
                seteditUserProfile((prev) =>
                  prev ? { ...prev, last_name: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20"
            />
          </div>

          {/* ... your other input fields unchanged ... */}

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              onClick={() => startTransition(() => handleSave())}
              className="w-full px-6 py-3 bg-[#2623fd] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
            >
              {isPending ? <Loader /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
