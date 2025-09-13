import React from "react";
import HeaderDashboard from "./HeaderDashboard";
import Progressbar from "./Progressbar";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string;
}

const TaskCenter = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Earbuds",
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Smart Watch",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Moisturizing Cream",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Sports Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop",
    },
  ];

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
                      src={product.image}
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
