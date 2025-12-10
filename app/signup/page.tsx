"use client";

import React, {
  useEffect,
  useState,
  useTransition,
  Suspense,
  useCallback,
} from "react";
import { ChevronDown } from "lucide-react";
import { signup } from "./action";
import { Loader } from "@/Components/Loader";
import Image from "next/image";
import { MdOutlineHelpOutline } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { useSearchParams } from "next/navigation";

// Separate component that uses useSearchParams
const ReferralCodeHandler: React.FC<{
  onCodeChange: (code: string) => void;
}> = ({ onCodeChange }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("ref");

    if (code) {
      onCodeChange(code);
      localStorage.setItem("referrer_code", code);
    }

  }, [searchParams, onCodeChange]);

  return null;
};

const CreateAccountForm: React.FC = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    firstName: "",
    lastName: "",
    gender: "",
    city: "",
    mobileNumber: "",
    verificationCode: "",
    address: "",
    dob: "",
    country: "",
    referralCode: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState<string[] | []>([]);

  const [agreements, setAgreements] = useState({
    privacy: true,
    terms: true,
    investment: true,
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleReferralCodeChange = useCallback((code: string) => {
    setFormData((prev) => ({ ...prev, referralCode: code }));
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const data = await res.json();
        const sorted = (data as Array<{ name: { common: string } }>)
          .map((c) => c.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(sorted);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAgreementChange = (field: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const ref = formData.referralCode || "";

    const submitData = {
      ...formData,
      referralCode: ref,
    };

    const res = await signup(submitData, confirmPassword);

    if (res && !res.success) {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#201d4c] p-6">
      {/* Wrap the referral code handler in Suspense */}
      <Suspense fallback={null}>
        <ReferralCodeHandler onCodeChange={handleReferralCodeChange} />
      </Suspense>

      <div className="flex justify-between items-center">
        <div>
          <Image
            src={"/groupLogo.png"}
            alt="logo"
            height={500}
            width={500}
            className="w-[106.78px] h-auto"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <MdOutlineHelpOutline color="white" size={22} />
          <GoGlobe color="white" size={22} />
        </div>
      </div>

      <div className="mt-8">
        <div className="text-left mb-8 flex items-left md:items-center flex-col md:flex-row md:justify-between justify-start">
          <h1 className="text-white text-[28px] font-semibold">
            Create Your SuperShopper Account
          </h1>
          <p className="text-white text-sm">
            Join Us Today By Filling Out The Form Below
          </p>
        </div>
        <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-[#2c2954]">
          {/* Personal Information */}
          <form
            className="space-y-4"
            onSubmit={(e) => startTransition(() => handleRegister(e))}
          >
            <div className="mb-8">
              <h3 className="text-white font-semibold text-[34px] mb-6">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div>
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
                  </div>

                  <label className="text-white text-sm my-4 block">
                    Country
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.country}
                      onChange={(e) => {
                        handleInputChange("country", e.target.value);
                      }}
                      className="flex-1 bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white placeholder-[#b4b4b0] w-full focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select your country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="text-white text-sm my-4 block">
                    Email Address
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
              </div>
            </div>
            {/* Verification Code & Location */}

            <div className="mb-8">
              {/* phone number*/}
              <div>
                <label className="text-white text-sm mb-2 block">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="+91*****"
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      handleInputChange("mobileNumber", e.target.value);
                    }}
                    className="flex-1 bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white placeholder-[#b4b4b0] focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            {/* Referral & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Referral */}

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
            </div>
            {/* Agreements */}
            <div className="mb-6">
              <h3 className="text-white font-semibold text-lg mb-4">
                Agreements
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-4 items-start">
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
            <button className="w-full bg-[#2723FF] hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors">
              {isPending ? <Loader /> : " Register / Create Account"}
            </button>
          </form>
        </div>
      </div>

      {/* Form Container */}
    </div>
  );
};

export default CreateAccountForm;
