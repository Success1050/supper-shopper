"use client";

import React, { useEffect, useState, useTransition } from "react";
import { HelpCircle, Play, Star } from "lucide-react";
import Progressbar from "./Progressbar";
import HeaderDashboard from "./HeaderDashboard";
import {
  getProducts,
  getTaskSteps,
  submission,
} from "@/app/dashboard/taskCenter/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "@/Components/Loader";

type completedTask = {
  reward: number;
};

interface TaskSteps {
  id: number;
  product_id: number;
  step_type: string;
  step_value: string;
}

const TaskExecution = ({ productId }: { productId: number }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [CompletedTask, setCompletedTask] = useState<completedTask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<any[]>([]);
  const [taskSteps, settaskStep] = useState<TaskSteps[] | []>([]);

  const [watchProgress, setWatchProgress] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  console.log("my product id", productId);

  const watchStep = taskSteps.find((s) => s.step_type === "watch");
  const commentStep = taskSteps.find((s) => s.step_type === "comment");
  const likeStep = taskSteps.find((s) => s.step_type === "like");
  const linkStep = taskSteps.find((s) => s.step_type === "open_link");

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const onsubmit = async () => {
    if (!productId) return;

    if (!comment || rating == 0) {
      return alert("please complete all tasks");
    }
    setLoading(true);

    const userComment = comment.trim();

    const res = await submission(productId, userComment, rating);
    if (!res?.success) {
      return console.log(res?.message);
    }

    router.push("/dashboard/wallet");
    console.log(res.data);
    setCompletedTask(res.data ?? []);
    alert("tasks completed, check wallet for reward");
    setComment("");
    setWatchProgress(0);
    setRating(0);
  };

  // const taskCompleted = CompletedTask.filter((task) => task.completed);

  const totalReward = CompletedTask.reduce<number>(
    (acc, task) => acc + (task.reward ?? 0),
    0
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      if (!res.success) return console.log(res.message);
      setProduct(res?.data ?? []);
    };

    fetchProducts();
  }, []); // only fetch once

  const singleTask = product.find((t) => t.product_id === productId);

  console.log("the single tasks", singleTask);

  useEffect(() => {
    const fetchTaskSteps = async () => {
      const res = await getTaskSteps(productId);
      if (res && res.success) {
        console.log("shout gbu", res.data);

        settaskStep(res.data as TaskSteps[]);
      } else {
        console.log(res?.message);
      }
    };

    fetchTaskSteps();
  }, [productId]); // ⬅️ watch singleTask, not productId

  // console.log("a single task", singleTask);

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
            <div className="w-[20%] h-full">
              <img
                src={singleTask?.products?.image_url || "/images/taskimg1.png"}
                alt="Task Reward"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Task Reward</h3>
              <div className="text-green-400 font-bold">
                ${singleTask?.reward}
              </div>
            </div>
          </div>
          {/* Watch Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm">Task Progress</span>
              <span className="text-white text-sm">1/3</span>
            </div>
            <Progressbar width={10} color="bg-[#2563EB]" />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Step 1: Watch Video</h3>
              <span className="text-white text-sm">0s / 10s Required</span>
            </div>

            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                src={
                  watchStep?.step_value ||
                  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
                }
                controls
                loop
                playsInline
                style={{ width: "100%", borderRadius: "12px" }}
              />
            </div>
          </div>

          {/* comment */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d] h-full">
            <h3 className="text-white font-semibold mb-4">
              Step 3: Write Comment
            </h3>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write Your Feedback..."
              className="w-full max-h-full lg:h-[90%] bg-[#37355d] border border-[#37355d] rounded-lg p-3 text-white placeholder-white resize-none focus:outline-none"
            />
          </div>

          {/* Step 2: Rating For Product */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d] flex flex-col justify-center gap-y-2">
            <h3 className="text-white text-[26px] font-semibold">
              Step 2: Rating For Product
            </h3>

            <div className="mb-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      value <= rating
                        ? "text-white fill-current"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleRatingClick(value)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Step 5: Submit Task */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#37355d]">
            <h3 className="text-white font-semibold mb-4">
              Step 5: Submit Task
            </h3>

            <button
              className="w-full bg-[#2723FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              onClick={() => startTransition(() => onsubmit())}
            >
              {isPending ? <Loader /> : "Done"}
            </button>
            <div className="flex-1 mt-2 flex items-center justify-start">
              <span className="text-white text-sm">
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
