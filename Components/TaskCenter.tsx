"use client";

import React, { useEffect, useState } from "react";
import HeaderDashboard from "./HeaderDashboard";
import Progressbar from "./Progressbar";
import Link from "next/link";
import { getProducts } from "@/app/dashboard/taskCenter/action";

interface Product {
  id: number;
  name: string;
  image_url: string;
}

const TaskCenter = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      if (!res.success) return console.log("an error occured");
      console.log(res.data);

      setProducts(res.data ?? []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen">
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
            <span className="text-white font-semibold">7 / 20</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-blue-200 text-sm">Total Daily Reward:</span>
            <span className="text-white font-semibold">$35.00</span>
          </div>

          {/* Progress bar */}

          <Progressbar width={10} />
        </div>

        {/* Active Tasks */}
        <div className="rounded-lg p-6">
          <h3 className="text-white font-semibold text-lg mb-6">
            Active Tasks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product: Product) => (
              <Link key={product.id} href={`/dashboard/tasks/${product.id}`}>
                <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border border-blue-700/30 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-white font-medium text-base mb-3">
                      {product.name}
                    </h4>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Take Reward
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCenter;
