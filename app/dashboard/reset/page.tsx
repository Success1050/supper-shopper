"use client";

import { useState } from "react";
import { ShoppingCart, Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { resetPassword } from "./action";

export default function PasswordResetPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const res = await resetPassword(formData.newPassword);
    if (res && !res.success) {
      return console.log(res.message);
    }
  }

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <ShoppingCart
              className="w-10 h-10 text-blue-500"
              strokeWidth={2.5}
            />
            <div className="text-white">
              <div className="text-2xl font-bold tracking-tight">SUPER</div>
              <div className="text-2xl font-bold tracking-tight">SHOPPER</div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-indigo-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-indigo-700/50 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">
            Change Password
          </h1>
          <p className="text-indigo-300 text-sm mb-6">
            Update your password to keep your account secure
          </p>

          <div className="space-y-5">
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-white text-sm font-medium mb-2"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  placeholder="Enter your current password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full bg-indigo-950/50 border border-indigo-700/50 rounded-lg px-4 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white transition-colors"
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
              <label
                htmlFor="newPassword"
                className="block text-white text-sm font-medium mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full bg-indigo-950/50 border border-indigo-700/50 rounded-lg px-4 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-white text-sm font-medium mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Re-enter new password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full bg-indigo-950/50 border border-indigo-700/50 rounded-lg px-4 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white transition-colors"
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
            <div className="bg-indigo-950/50 border border-indigo-700/30 rounded-lg p-4">
              <h3 className="text-white font-semibold text-sm mb-2">
                Security Tips
              </h3>
              <ul className="space-y-1.5">
                <li className="text-indigo-300 text-xs flex items-start">
                  <span className="mr-2">•</span>
                  <span>Password Must Be At Least 8 Characters.</span>
                </li>
                <li className="text-indigo-300 text-xs flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Use Numbers, Letters, And Special Characters For Stronger
                    Security.
                  </span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
              >
                Save Changes
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleCancel}
                className="w-full bg-transparent border border-indigo-600 hover:bg-indigo-800/50 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                Cancel
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
