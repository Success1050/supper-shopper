"use client";

import { useEffect, useState, useTransition } from "react";
import { Camera } from "lucide-react";
import { getUserProfile, saveProfile } from "@/app/dashboard/profile/actions";
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
}

export default function EditProfile({
  profileId,
}: {
  profileId: string | undefined;
}) {
  const [editUserProfile, seteditUserProfile] =
    useState<UserProfileTypes | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfileTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleEdit = async () => {
      const res = await getUserProfile(profileId);
      if (!res.success) {
        return alert(res.message);
      }
      console.log(res.data);

      setUserProfile(res.data);
    };
    handleEdit();
  }, [userProfile?.id]);

  useEffect(() => {
    if (userProfile) {
      seteditUserProfile(userProfile);
    }
  }, [userProfile]);

  const handleSave = async () => {
    setLoading(true);
    const res = await saveProfile(profileId, editUserProfile);
    if (!res.success) {
      return console.log("failed to update");
    }

    alert("updated successfully");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900">
      {/* HEADER - You can remove this section and use your own header */}
      {/* 
      <div className="flex items-center justify-between p-4 text-white">
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </button>
          <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-sm">🔔</span>
          </button>
          <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-sm">☰</span>
          </button>
        </div>
      </div>
      */}
      {/* END OF HEADER */}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-30 hover:bg-opacity-20 transition-all">
            <Camera className="w-4 h-4" />
            <span className="text-sm">Change Photo</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={editUserProfile?.first_name ?? ""}
              onChange={(e) =>
                seteditUserProfile((prev) =>
                  prev ? { ...prev, first_name: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20 focus:outline-none focus:border-opacity-40 placeholder-white placeholder-opacity-50"
            />
          </div>

          {/* Surname */}
          <div>
            <label className="block text-white text-sm mb-2">Surname</label>
            <input
              type="text"
              name="surname"
              value={editUserProfile?.last_name ?? ""}
              onChange={(e) =>
                seteditUserProfile((prev) =>
                  prev ? { ...prev, last_name: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20 focus:outline-none focus:border-opacity-40 placeholder-white placeholder-opacity-50"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-white text-sm mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={editUserProfile?.address ?? ""}
              onChange={(e) =>
                setUserProfile((prev) =>
                  prev ? { ...prev, address: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20 focus:outline-none focus:border-opacity-40 placeholder-white placeholder-opacity-50"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-white text-sm mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={editUserProfile?.postalCode ?? ""}
              onChange={(e) =>
                setUserProfile((prev) =>
                  prev ? { ...prev, postalCode: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20 focus:outline-none focus:border-opacity-40 placeholder-white placeholder-opacity-50"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-black text-sm mb-2">Country</label>
            <div className="relative">
              <select
                name="country"
                value={editUserProfile?.country ?? ""}
                onChange={(e) =>
                  setUserProfile((prev) =>
                    prev ? { ...prev, country: e.target.value } : null
                  )
                }
                className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20 focus:outline-none focus:border-opacity-40 appearance-none cursor-pointer"
              >
                <option value="United States" className="bg-indigo-900">
                  United States
                </option>
                <option value="United Kingdom" className="bg-indigo-900">
                  United Kingdom
                </option>
                <option value="Canada" className="bg-indigo-900">
                  Canada
                </option>
                <option value="Australia" className="bg-indigo-900">
                  Australia
                </option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-white text-sm mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={editUserProfile?.mobilenumber ?? ""}
              onChange={(e) =>
                seteditUserProfile((prev) =>
                  prev ? { ...prev, mobilenumber: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20 focus:outline-none focus:border-opacity-40 placeholder-white placeholder-opacity-50"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-white text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              value={editUserProfile?.email ?? ""}
              onChange={(e) =>
                setUserProfile((prev) =>
                  prev ? { ...prev, email: e.target.value } : null
                )
              }
              className="w-full px-4 py-3 bg-white bg-opacity-10 text-black rounded-lg border border-white border-opacity-20 focus:outline-none focus:border-opacity-40 placeholder-white placeholder-opacity-50"
            />
          </div>

          {/* Registration Information */}
          <div>
            <label className="block text-white text-sm mb-2">
              Registration Information
            </label>
            <div className="w-full px-4 py-3 bg-white bg-opacity-10 text-white text-opacity-50 rounded-lg border border-white border-opacity-20">
              Registration info placeholder
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              onClick={() => startTransition(() => handleSave())}
              className="w-full px-6 py-3 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
            >
              {isPending ? <Loader /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
