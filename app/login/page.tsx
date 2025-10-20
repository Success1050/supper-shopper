"use client";

import React, { useState } from "react";
import { login } from "./action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader } from "@/Components/Loader";

const SuperShopperLogin: React.FC = () => {
  const router = useRouter();
  const [emailorPhone, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  // const [email, setuseremail] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailorPhone || !password) {
      return alert("Please fill all the details");
    }

    const res = await login({ emailorPhone, password });
    if (!res?.success) {
      alert(res?.message);
    }
  };

  async function handleSubmit() {
    const res = await fetch("/api/auth/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ emailorPhone }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data.message);
  }

  return (
    <div className="min-h-screen bg-[#201d46] flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-15 mx-auto flex justify-center">
            <div className="flex items-center text-white">
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
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <form
              onSubmit={(e) => startTransition(() => handleLogin(e))}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Email / Mobile Number
                </label>
                <input
                  type="text"
                  value={emailorPhone}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email / mobile number"
                  className="w-full bg-[#2b2954] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#2b2954] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-gray-800 border border-gray-600 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-gray-300 text-sm">
                    Remember Me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-white text-sm hover:underline"
                  onClick={handleSubmit}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isPending ? (
                  <Loader />
                ) : (
                  <>
                    Login
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
                  </>
                )}
              </button>
            </form>

            {/* <div className="text-center">
              <div className="text-gray-400 text-sm mb-4">Or Continue with</div>

              <div className="space-y-3">
                <button className="w-full bg-[#2b2954] border border-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-700/60 transition-colors">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
                  Continue With Google
                </button>

                <button className="w-full bg-[#2b2954] border border-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-700/60 transition-colors">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue With Facebook
                </button>
              </div>
            </div> */}

            <div className="text-center text-sm text-white">
              Don't Have An Account?{" "}
              <a
                href="/signup"
                className="text-white hover:underline font-medium"
              >
                Register Now
              </a>
            </div>

            <div className="text-center text-xs text-white">
              By Logging In, You Agree To
              <br />
              Our{" "}
              <a href="#" className="text-blue-400 hover:underline underline">
                Terms of Use
              </a>{" "}
              And{" "}
              <a href="#" className="text-blue-400 hover:underline underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-4 bg-gray-200 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Woman working on laptop"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SuperShopperLogin;
