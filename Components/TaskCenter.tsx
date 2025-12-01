"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import HeaderDashboard from "./HeaderDashboard";
import Progressbar from "./Progressbar";
import Link from "next/link";
import { getProducts } from "@/app/dashboard/taskCenter/action";
import LoadingBar from "./MainLoading";
import { useAuthStore } from "@/store";

export interface UserTaskWithProduct {
  id: number;
  user_id: string;
  product_id: number;
  reward: number;
  completed: boolean;
  completedAt: string;
  products: {
    name: string;
    image_url: string;
  };
}

const TaskCenter = () => {
  const [products, setProducts] = useState<UserTaskWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useAuthStore((state) => state.userId);

  const fetchProducts = useCallback(async () => {
    if (!userId) return;
    const res = await getProducts(userId ?? undefined);
    if (!res.success) return console.log("an error occured");

    setProducts(res.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products listed:", products);

  // Memoize today's date string to avoid recalculating on every render
  const todayDateString = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  // Memoize completed today tasks
  const completedToday = useMemo(() => {
    return products.filter((product) => {
      if (!product.completed) return false;

      const completedDate = new Date(product.completedAt)
        .toISOString()
        .split("T")[0];

      return completedDate === todayDateString;
    });
  }, [products, todayDateString]);

  // Memoize total reward calculation
  const totalReward = useMemo(() => {
    return completedToday.reduce<number>(
      (acc, task) => acc + (task.reward ?? 0),
      0
    );
  }, [completedToday]);

  // Memoize total completed tasks count
  const totalCompletedCount = useMemo(() => {
    return products.filter((p) => p.completed).length;
  }, [products]);

  // Memoize whether there are products
  const hasProducts = useMemo(() => products.length > 0, [products.length]);

  if (loading) {
    return (
      <div className="min-h-full flex justify-center items-center bg-[#201d4c]">
        <LoadingBar />
      </div>
    );
  }

  return (
    <div className="bg-[#201d4c] min-h-screen px-2 md:px-0">
      <div>
        {/* Active Products Header */}
        <div className=" p-6 mb-0">
          <h2 className="text-white font-semibold text-[34px] mb-4">
            Tasks Summary
          </h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-[20px]">
              My Tasks Completed Today:
            </span>
            <span className="text-white text-[25px] font-semibold">
              {completedToday?.length ?? 0}%
            </span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-[20px]">
              Task Completed Total :
            </span>
            <span className="text-white font-semibold text-[25px]">
              {totalCompletedCount}
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-[20px]">Total Daily Reward:</span>
            <span className="text-white text-[25px] font-semibold">
              ${totalReward}
            </span>
          </div>

          {/* Progress bar */}

          <Progressbar width={totalReward} color="bg-[#fff]" />
        </div>

        {/* Active Tasks */}
        <div className="rounded-lg p-6">
          <h3
            className={`text-white font-semibold text-[34px] md:text-[40px] mb-6 ${
              !hasProducts ? "hidden" : "block"
            }`}
          >
            Active Tasks
          </h3>

          {!hasProducts ? (
            <div className="min-h-full flex justify-center items-center">
              {" "}
              <h3 className="text-white font-semibold text-lg mb-6">
                No Active Tasks. Please purchase a package
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product: UserTaskWithProduct) => (
                <div
                  className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-[10px] h-[170px] md:h-[200px] flex items-center space-x-4"
                  key={product.product_id}
                >
                  <div className="flex-shrink-0 w-[40%] h-full">
                    <img
                      src={
                        product?.products.image_url || "/images/product2.png"
                      }
                      alt={product.products.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-white font-medium text-base mb-3">
                      {product.products.name}
                    </h4>
                    {product.completed === true ? (
                      <h2 className="  text-white  text-sm font-medium">
                        Completed
                      </h2>
                    ) : (
                      <Link href={`/dashboard/tasks/${product.product_id}`}>
                        <button className="bg-[#2723FF] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                          Take Reward
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCenter;
