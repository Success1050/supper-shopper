"use client";

import React, { useState } from "react";
import { HelpCircle, Play, Star } from "lucide-react";
import Progressbar from "./Progressbar";
import HeaderDashboard from "./HeaderDashboard";

const TaskExecution = ({ productId }: { productId: number }) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [watchProgress, setWatchProgress] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // Simulate video progress
    const interval = setInterval(() => {
      setWatchProgress((prev) => {
        if (prev >= 10) {
          clearInterval(interval);
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const task = [
    {
      id: 1,
      name: "Wireless Earbuds",
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop",
    },
  ];

  const singleTask = task.find((t) => t.id === productId);
  if (!singleTask) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-semibold">Task Execution</h1>
          <HelpCircle className="text-white w-6 h-6 cursor-pointer" />
        </div>

        {/* Task Reward Section */}
        <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16">
              <img
                src={"/images/taskimg1.png"}
                alt="Task Reward"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Task Reward</h3>
              <div className="text-green-400 font-bold">$0.10</div>
            </div>
          </div>
          {/* Watch Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm">{singleTask.name}</span>
              <span className="text-white text-sm">{watchProgress}s / 10s</span>
            </div>
            <Progressbar width={10} />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1: Watch Video */}
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Step 1: Watch Video</h3>
              <span className="text-blue-200 text-sm">0s / 10s Required</span>
            </div>

            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop"
                alt="Video Thumbnail"
                className="w-full h-48 object-cover"
              />
              {!isVideoPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <div className="bg-white/20 rounded-full p-4 hover:bg-white/30 transition-colors">
                    <Play className="text-white w-8 h-8" fill="currentColor" />
                  </div>
                </div>
              )}
              {isVideoPlaying && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  LIVE
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Rating For Product */}
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">
                Step 2: Rating For Product
              </h3>
              <span className="text-white text-sm">1/10</span>
            </div>

            <div className="mb-4">
              <span className="text-blue-200 text-sm mb-2 block">Rating:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      value <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleRatingClick(value)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Open Product Link */}
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
            <h3 className="text-white font-semibold mb-4">
              Step 4: Open Product Link
            </h3>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Product Open
            </button>
          </div>

          {/* Step 3: Write Comment */}
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
            <h3 className="text-white font-semibold mb-4">
              Step 3: Write Comment
            </h3>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write Your Feedback..."
              className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg p-3 text-white placeholder-blue-300 resize-none h-24 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Step 5: Submit Task */}
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
            <h3 className="text-white font-semibold mb-4">
              Step 5: Submit Task
            </h3>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Done
            </button>
            <div className="flex-1 mt-2 flex items-center justify-center">
              <span className="text-blue-200 text-sm">
                Complete Steps 1-4 To Submit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskExecution;
