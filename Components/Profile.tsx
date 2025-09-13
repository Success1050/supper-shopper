import React, { useState } from "react";
import { ChevronRight, LogOut, Edit } from "lucide-react";

const ProfileSettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);

  const handleLogout = () => {
    alert("Logging out...");
  };

  const handleEdit = () => {
    alert("Edit profile functionality");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div>
        {/* Profile Header */}
        <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                  alt="John Doe"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Johndoe</h2>
                <div className="text-blue-200 text-sm">johndoe@gmail.com</div>
                <div className="text-blue-200 text-sm">+1 202-555-0125</div>
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
        <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50 mb-6">
          <h3 className="text-white font-semibold text-lg mb-6">
            Personal Info
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Full Name</span>
              <span className="text-white">John Doe</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Date Of Birth</span>
              <span className="text-white">15 March 1992</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Gender</span>
              <span className="text-white">Male</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Country / Region</span>
              <span className="text-white">United States</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">City</span>
              <span className="text-white">New York</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">Address</span>
              <span className="text-white">123 Broadway Ave, NY 10001</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-blue-200 text-sm">
                Referral Code / Inviter ID
              </span>
              <span className="text-white">REF2025ABC</span>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row flex-1 gap-3">
          {/* Account & Security - First Section */}
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50 mb-6 flex-1">
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
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50 mb-6 flex-1">
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
        <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50 mb-6">
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
          onClick={handleLogout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
