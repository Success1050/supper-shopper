"use client";

import React, { useEffect, useState } from "react";
import HeaderDashboard from "./HeaderDashboard";
import Progressbar from "./Progressbar";
import Link from "next/link";
import { getProducts } from "@/app/dashboard/taskCenter/action";
import LoadingBar from "./MainLoading";

interface UserTaskWithProduct {
  id: number;
  user_id: string;
  product_id: number;
  reward: number;
  completed: boolean;
  products: {
    name: string;
    image_url: string;
  };
}

const TaskCenter = () => {
  const [products, setProducts] = useState<UserTaskWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      if (!res.success) return console.log("an error occured");
      // console.log(res?.data);

      setProducts(res.data ?? []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  console.log("products listed:", products);

  if (loading) {
    return (
      <div className="min-h-full flex justify-center items-center bg-[#201d4c]">
        <LoadingBar />
      </div>
    );
  }

  const completedTask = products.filter((product) => product.completed);

  const totalReward = completedTask.reduce<number>(
    (acc, task) => acc + (task.reward ?? 0),
    0
  );

  return (
    <div className="bg-[#201d4c] min-h-screen">
      <div>
        {/* Active Products Header */}
        <div className=" p-6 mb-6">
          <h2 className="text-white font-semibold text-xl mb-4">
            Active Products
          </h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-200 text-sm">
              Total Tasks Completed Today:
            </span>
            <span className="text-white font-semibold">
              {completedTask?.length ?? 0} / 20
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-blue-200 text-sm">Total Daily Reward:</span>
            <span className="text-white font-semibold">${totalReward}</span>
          </div>

          {/* Progress bar */}

          <Progressbar width={totalReward} />
        </div>

        {/* Active Tasks */}
        <div className="rounded-lg p-6">
          <h3
            className={`text-white font-semibold text-lg mb-6 ${
              products.length === 0 ? "hidden" : "block"
            }`}
          >
            Active Tasks
          </h3>

          {products.length === 0 ? (
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
                  className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-blue-700/30 flex items-center space-x-4"
                  key={product.product_id}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={
                        product?.products.image_url || "/images/product2.png"
                      }
                      alt={product.products.name}
                      className="w-20 h-20 object-cover rounded-lg"
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
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
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
