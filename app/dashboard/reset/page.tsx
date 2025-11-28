"use client";

import { useState } from "react";
import { ShoppingCart, Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { resetPassword } from "./action";
import { useTransition } from "react";
import { Loader } from "@/Components/Loader";
import Image from "next/image";

const PasswordResetPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function handleReset() {
    if (formData.newPassword != formData.confirmPassword) {
      alert("passwords does not match");
      return;
    }
    setLoading(true);
    const res = await resetPassword(formData.newPassword);
    if (res && !res.success) {
      console.log(res.message);
      setLoading(false);
      return;
    }

    alert("password updated successfully");
    setLoading(false);
  }

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-20">
      <div className="w-full mt-0">
        {/* Form Card */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">
            Change Password
          </h1>
          <p className="text-white/60 text-sm">
            Update your password to keep your account secure.
          </p>
        </div>
        <div className="bg-[#2b2a54] rounded-2xl p-8 border border-white/10">
          {/* Header */}

          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter Your Current Password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full bg-[#36355d] text-white placeholder-white rounded-xl px-4 py-4  transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-white font-semibold mb-3">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full bg-[#36355d] text-white placeholder-white rounded-xl px-4 py-4  transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-Enter New Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full bg-[#36355d] text-white placeholder-white rounded-xl px-4 py-4  transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Security Tips */}
            <div>
              <h3 className="text-white font-semibold mb-3">Security Tips:</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Password Must Be At Least 8 Characters.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Use Numbers, Letters, And Special Characters For Stronger
                    Security.
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => startTransition(() => handleReset())}
                disabled={isPending}
                className="flex-1 bg-[#2723FF] text-white font-semibold py-4 rounded-xl hover:bg-[#1f1acc] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Loader />
                ) : (
                  <>
                    SAVE PROFILE
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-transparent text-white font-semibold py-4 rounded-xl border-2 border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2"
              >
                CANCEL
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
