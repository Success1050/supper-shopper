"use client";

import React, { useState } from "react";

interface AuthPageProps {
  mode?: "login" | "signup";
  onModeChange?: (mode: "login" | "signup") => void;
  imageSrc: string;
  imageAlt: string;
}

export const AuthPage = ({
  mode = "login",
  onModeChange,
  imageSrc,
  imageAlt,
}: AuthPageProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    rememberMe: false,
    agreeToTerms: false,
  });

  const isSignup = mode === "signup";

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (isSignup) {
      console.log("Signup clicked", formData);
    } else {
      console.log("Login clicked", formData);
    }
  };

  const toggleMode = () => {
    const newMode = isSignup ? "login" : "signup";
    if (onModeChange) {
      onModeChange(newMode);
    } else {
      // Fallback for when no onModeChange handler is provided
      // You can use Next.js router here if needed
      console.log(`Would navigate to ${newMode} page`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            {/* Logo */}
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-[#2723FF] rounded-md flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">SUPER</span>
              <span className="text-xl font-bold text-blue-600 ml-1">
                SHOPPER
              </span>
            </div>

            {/* Welcome Text */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                {isSignup ? (
                  <>
                    JOIN <span className="text-blue-600">US!</span>
                  </>
                ) : (
                  <>
                    WELCOME <span className="text-blue-600">BACK!</span>
                  </>
                )}
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                {isSignup
                  ? "Create your account to start earning daily rewards and managing your shopping experience."
                  : "Log in to continue earning daily rewards and managing your account."}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Name Fields - Only for Signup */}
              {isSignup && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </div>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </div>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder=""
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address or Mobile Number
                </div>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder=""
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder=""
                />
              </div>

              {/* Confirm Password - Only for Signup */}
              {isSignup && (
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </div>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder=""
                  />
                </div>
              )}

              {/* Remember Me / Agree to Terms */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={
                    isSignup ? formData.agreeToTerms : formData.rememberMe
                  }
                  onChange={(e) =>
                    handleInputChange(
                      isSignup ? "agreeToTerms" : "rememberMe",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                  onClick={() =>
                    handleInputChange(
                      isSignup ? "agreeToTerms" : "rememberMe",
                      isSignup ? !formData.agreeToTerms : !formData.rememberMe
                    )
                  }
                >
                  {isSignup
                    ? "I agree to the Terms & Conditions and Privacy Policy"
                    : "Remember Me"}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full bg-[#2723FF] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                onClick={handleSubmit}
              >
                {isSignup ? "Create Account" : "Login"}
                <svg
                  className="w-4 h-4 ml-2"
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

              {/* Forgot Password - Only for Login */}
              {!isSignup && (
                <div className="text-center">
                  <div className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                    Forget Password
                  </div>
                </div>
              )}

              {/* Mode Toggle */}
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    {isSignup ? "Sign In" : "Sign Up"}
                  </button>
                </div>
              </div>

              {/* Social Login */}
              {/* Social Login */}
              <div className="space-y-3">
                <div className="text-center text-sm text-gray-500 mb-4">
                  Or {isSignup ? "sign up" : "continue"} with
                </div>

                <div className="flex justify-center space-x-4">
                  {/* Google */}
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>

                  {/* Facebook */}
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>

                  {/* Apple */}
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                      <path d="M16.365 1.43c0 1.14-.417 2.176-1.15 2.924-.83.84-1.9 1.31-3.02 1.23-.07-1.1.38-2.19 1.16-2.95.8-.79 1.87-1.27 3.01-1.28zM20.2 17.53c-.44 1.02-.96 1.97-1.57 2.86-.82 1.19-1.63 2.38-2.93 2.39-1.28.01-1.69-.77-3.15-.77-1.47 0-1.92.75-3.14.79-1.27.05-2.24-1.28-3.06-2.47-1.66-2.4-2.93-6.77-1.23-9.73.85-1.46 2.37-2.39 4.04-2.42 1.27-.03 2.46.86 3.14.86.66 0 2.16-1.06 3.65-.9.62.03 2.37.25 3.5 1.9-.09.06-2.09 1.22-2.07 3.63.02 2.89 2.55 3.84 2.61 3.86z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Terms - Only for Login */}
              {!isSignup && (
                <div className="text-center text-xs text-gray-500 leading-relaxed">
                  By logging in, you agree to our{" "}
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 relative min-h-96 lg:min-h-full">
            <div className="absolute inset-0 rounded-r-2xl lg:rounded-r-2xl lg:rounded-l-none overflow-hidden">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                style={{
                  mixBlendMode: "multiply",
                  opacity: 0.9,
                }}
              />
              {/* Optional overlay for better text contrast if needed */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-10"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
