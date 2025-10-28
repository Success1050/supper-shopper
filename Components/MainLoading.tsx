"use client";

import { useState, useEffect } from "react";

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {" "}
      <div className="w-full h-full">
        <div className="backdrop-blur-xl bg-white/10v p-8 shadow-2xl w-full h-[100%]">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isComplete ? "Complete!" : "Loading..."}
            </h2>
            <p className="text-purple-200">
              {isComplete
                ? "All systems ready"
                : "Please wait while we prepare everything"}
            </p>
          </div>

          {/* Progress Bar Container */}
          <div className="relative">
            {/* Background Bar */}
            <div className="h-6 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              {/* Progress Fill */}
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Animated Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Percentage Text */}
            <div className="mt-4 text-center">
              <span className="text-5xl font-bold text-white tabular-nums">
                {progress}
              </span>
              <span className="text-3xl text-purple-300 ml-1">%</span>
            </div>
          </div>

          {/* Status Messages */}
          <div className="mt-8 space-y-2">
            <div
              className={`flex items-center space-x-3 transition-opacity duration-300 ${
                progress > 20 ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  progress > 20 ? "bg-green-400" : "bg-gray-400"
                }`}
              />
              <span className="text-sm text-purple-200">
                Initializing components
              </span>
            </div>
            <div
              className={`flex items-center space-x-3 transition-opacity duration-300 ${
                progress > 50 ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  progress > 50 ? "bg-green-400" : "bg-gray-400"
                }`}
              />
              <span className="text-sm text-purple-200">Loading resources</span>
            </div>
            <div
              className={`flex items-center space-x-3 transition-opacity duration-300 ${
                progress > 80 ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  progress > 80 ? "bg-green-400" : "bg-gray-400"
                }`}
              />
              <span className="text-sm text-purple-200">Finalizing setup</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}
