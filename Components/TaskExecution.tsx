"use client";

import React, { useEffect, useState } from "react";
import { HelpCircle, Play, Star } from "lucide-react";
import Progressbar from "./Progressbar";
import HeaderDashboard from "./HeaderDashboard";
import {
  getProducts,
  getTaskSteps,
  submission,
} from "@/app/dashboard/taskCenter/action";
import Link from "next/link";

type completedTask = {
  reward: number;
};

const TaskExecution = ({ productId }: { productId: number }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [CompletedTask, setCompletedTask] = useState<completedTask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<any[]>([]);
  const [taskSteps, settaskStep] = useState<any[]>([]);
  const [isLinkOpen, setisLinkOpen] = useState<boolean>(false);
  const [watchProgress, setWatchProgress] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  console.log("my product id", productId);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const onsubmit = async (productid: number) => {
    if (!productId) return;
    if (!watchProgress || !comment || isLinkOpen === false || !rating) {
      return alert("please complete all tasks");
    }
    setLoading(true);

    const userComment = comment.trim();

    const res = await submission(productid, userComment, rating, isLinkOpen);
    if (!res?.success) {
      return console.log(res?.message);
    }
    console.log(res.data);
    setCompletedTask(res.data ?? []);
    alert("tasks completed, check wallet for reward");
    setComment("");
    setWatchProgress(0);
    setRating(0);
    setisLinkOpen(false);
  };

  // const taskCompleted = CompletedTask.filter((task) => task.completed);

  const totalReward = CompletedTask.reduce<number>(
    (acc, task) => acc + (task.reward ?? 0),
    0
  );

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

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      if (!res.success) return console.log(res.message);
      setProduct(res?.data ?? []);
    };

    fetchProducts();
  }, []); // only fetch once

  useEffect(() => {
    if (!product.length) return;

    const singleproductId = product.find((t) => t.product_id === productId);

    if (!singleproductId) return;

    const fetchTaskSteps = async () => {
      const res = await getTaskSteps(singleproductId.product_id);
      if (!res.success) return console.log(res.message);

      settaskStep(res?.data ?? []);
    };

    fetchTaskSteps();
  }, [productId, product]);

  const singleTask = product.find((t) => t.product_id === productId);
  if (!singleTask) {
    return null;
  }
  console.log("a single task", singleTask);

  return (
    <div className="min-h-screen bg-[#201d4c] px-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-semibold">Task Execution</h1>
          <HelpCircle className="text-white w-6 h-6 cursor-pointer" />
        </div>

        {/* Task Reward Section */}
        <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2c2954] mb-6">
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
              <div className="text-green-400 font-bold">${totalReward}</div>
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
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Step 1: Watch Video</h3>
              <span className="text-blue-200 text-sm">0s / 10s Required</span>
            </div>

            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                src={
                  taskSteps[0]?.step_value ||
                  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
                }
                controls
                autoPlay={false}
                loop
                playsInline
                style={{ width: "100%", borderRadius: "12px" }}
              />
            </div>
          </div>

          {/* Step 2: Rating For Product */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d]">
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
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d]">
            <h3 className="text-white font-semibold mb-4">
              Step 4: Open Product Link
            </h3>

            <a
              href={
                taskSteps[3]?.step_value.startsWith("https")
                  ? taskSteps[3]?.step_value
                  : `https://${taskSteps[3]?.step_value}`
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setisLinkOpen(true)}
            >
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Product Open
              </button>
            </a>
          </div>

          {/* Step 3: Write Comment */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d]">
            <h3 className="text-white font-semibold mb-4">
              Step 3: Write Comment
            </h3>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write Your Feedback..."
              className="w-full bg-[#37355d] border border-[#37355d] rounded-lg p-3 text-white placeholder-blue-300 resize-none h-24 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Step 5: Submit Task */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d]">
            <h3 className="text-white font-semibold mb-4">
              Step 5: Submit Task
            </h3>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              onClick={() => onsubmit(productId)}
            >
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
