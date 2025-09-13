import React, { useState, useRef, useEffect } from "react";

const AccountVerification: React.FC = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    // Focus next empty input or last input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="w-full h-full justify-center items-center flex p-4">
      <div className="bg-indigo-800/40 backdrop-blur-sm border border-indigo-700/50 rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center text-white mb-6">
            <div className="bg-white p-2 rounded-md mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-indigo-600"
              >
                <path
                  d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"
                  fill="currentColor"
                />
                <path
                  d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold">SUPER</div>
              <div className="text-sm -mt-1">SHOPPER</div>
            </div>
          </div>

          <h1 className="text-white text-2xl font-bold mb-2">
            Verify Your Account
          </h1>
          <p className="text-gray-300 text-sm">
            For your security, please enter the 6-digit code we sent to your
            email/mobile.
          </p>
        </div>

        {/* Code Input */}
        <div className="mb-6">
          <div className="flex justify-center gap-3 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleInputChange(index, e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 bg-gray-800/60 border border-gray-600 rounded-lg text-center text-white text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            ))}
          </div>

          <div className="text-center mb-4">
            <button className="text-gray-300 text-sm hover:text-white transition-colors">
              Resend Code
            </button>
          </div>

          <div className="text-center text-gray-400 text-sm mb-6">
            We sent a code to erro***@gmail.com
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            disabled={code.some((digit) => digit === "")}
          >
            Confirm & Continue
            <svg
              className="ml-2 w-4 h-4"
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

          <button className="w-full text-gray-300 hover:text-white py-2 transition-colors">
            Back to Login
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center">
          <p className="text-[#FFFFFF] text-xs">
            This extra step helps protect your account from unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
