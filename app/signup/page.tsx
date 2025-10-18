"use client";

import React, { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { signup } from "./action";
import { Loader } from "@/Components/Loader";

const CreateAccountForm: React.FC = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    firstName: "",
    lastName: "",
    gender: "",
    city: "",
    address: "",
    dob: "",
    verificationCode: "",
    country: "",
    referralCode: "REF2025AB",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [agreements, setAgreements] = useState({
    privacy: true,
    terms: true,
    investment: true,
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAgreementChange = (field: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const sendVerificationCode = () => {
    alert("Verification code sent!");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert verificationCode to number before passing to signup
    const submitData = {
      ...formData,
      verificationCode: formData.verificationCode.trim(),
    };
    const res = await signup(submitData, confirmPassword!);

    if (res && res.message === "passwords does not match") {
      setMessage(res.message);
    }
    if (res && !res.success) {
      alert(res.message);
    }
  };

  console.log(message);

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
  ];

  return (
    <div className="min-h-screen bg-[#201d4c] p-6 pt-30">
      <div>
        {/* Header */}
        <div className="text-center mb-8 flex items-center flex-col md:flex-row md:justify-between gap-4">
          <h1 className="text-white text-2xl font-semibold mb-2">
            Create Your Account
          </h1>
          <p className="text-white text-sm">
            Join Us Today By Filling Out The Form Below
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-[#2c2954]">
          {/* Personal Information */}
          <form
            className="space-y-4"
            onSubmit={(e) => startTransition(() => handleRegister(e))}
          >
            <div className="mb-8">
              <h3 className="text-white font-semibold text-lg mb-6">
                Personal Information
              </h3>

              <div className="space-y-4">
                {/* Email Address OR Mobile Number */}

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Email Address OR Mobile Number
                  </label>
                  <input
                    type="text"
                    value={formData.emailOrPhone}
                    onChange={(e) =>
                      handleInputChange("emailOrPhone", e.target.value)
                    }
                    className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      Date of birth
                    </label>
                    <input
                      type="text"
                      value={formData.dob}
                      placeholder="dd/mm/yy"
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      Gender
                    </label>
                    <input
                      type="text"
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Verification Code & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Verification Code */}
              <div>
                <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    Verification Code
                  </h3>
                  <button
                    type="button"
                    onClick={sendVerificationCode}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    Send Code
                  </button>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-Digit Code"
                      value={formData.verificationCode}
                      onChange={(e) =>
                        handleInputChange("verificationCode", e.target.value)
                      }
                      className="flex-1 bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white placeholder-[#b4b4b0] focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Location
                </h3>
                <div>
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      Country
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter your country"
                        value={formData.country}
                        onChange={(e) => {
                          handleInputChange("country", e.target.value);
                        }}
                        className="flex-1 bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white placeholder-[#b4b4b0] focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      City
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter your City"
                        value={formData.city}
                        onChange={(e) => {
                          handleInputChange("city", e.target.value);
                        }}
                        className="flex-1 bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white placeholder-[#b4b4b0] focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      Address
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter your Address"
                        value={formData.address}
                        onChange={(e) => {
                          handleInputChange("address", e.target.value);
                        }}
                        className="flex-1 bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white placeholder-[#b4b4b0] focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Referral & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Referral */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Referral
                </h3>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Referral Code(optional)
                  </label>
                  <input
                    type="text"
                    value={formData.referralCode}
                    onChange={(e) =>
                      handleInputChange("referralCode", e.target.value)
                    }
                    className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Security
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Agreements */}
            <div className="mb-6">
              <h3 className="text-white font-semibold text-lg mb-4">
                Agreements
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={agreements.privacy}
                      onChange={() => handleAgreementChange("privacy")}
                      className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-blue-500 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="privacy" className="text-white text-sm">
                      I confirm that I have read and agree to the Privacy Policy
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="investment"
                      checked={agreements.investment}
                      onChange={() => handleAgreementChange("investment")}
                      className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-blue-500 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="privacy" className="text-white text-sm">
                      I understand the Risk of Investment
                    </label>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreements.terms}
                    onChange={() => handleAgreementChange("terms")}
                    className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-blue-500 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-white text-sm">
                    I agree to the Terms of Use
                  </label>
                </div>
              </div>
            </div>
            {/* Register Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors">
              {isPending ? <Loader /> : " Register / Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;
