"use client";
import React, { useEffect, useState } from "react";
import {
  fetchPackages,
  userBuyPackages,
} from "@/app/dashboard/package-lists/action";
import { useRouter } from "next/navigation";

const PackageSelection: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState<{
    [key: number]: boolean;
  }>({});
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Fetch packages from Supabase
  useEffect(() => {
    const fetchuserPackages = async () => {
      setLoading(true);
      const res = await fetchPackages();
      if (!res.success) {
        return console.log(res.error);
      }
      setLoading(false);
      setPackages(res.data ?? []);
    };

    fetchuserPackages();
  }, []);

  const buyPackage = async (packageId: number) => {
    console.log("Buying package:", packageId);

    try {
      setLoadingPackages((prev) => ({ ...prev, [packageId]: true }));

      const res = await userBuyPackages(packageId);

      if (!res) {
        alert("No response from server");
        return;
      }

      // safely check success
      if (!res.success) {
        alert(res.error || "Failed to purchase package");
        return;
      }

      console.log("Purchase response:", res.data);
      setMessage(`Successfully purchased package ${packageId}`);
      router.push("/dashboard/taskCenter");
    } catch (error) {
      console.error("Error buying package:", error);
      alert("An error occurred while purchasing the package");
    } finally {
      setLoadingPackages((prev) => ({ ...prev, [packageId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#201d4c] p-6">
      <div>
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Buy A Package</h1>
          <p className="text-gray-300 text-sm">
            Choose the package that fits your goals and start earning by
            completing tasks.
          </p>
        </div>

        {message && (
          <div className="mb-4 text-center text-yellow-300">{message}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#2b2a54] backdrop-blur-sm rounded-lg p-6 border border-gray-700/50"
              >
                <div className="text-center mb-6">
                  <div className="text-white text-3xl font-bold mb-2">
                    ${pkg.price}
                  </div>
                  <div className="text-gray-400 text-sm">One-time payment</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Tasks Per Day</span>
                    <span className="text-white font-medium">
                      {pkg.tasks_per_day}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Reward Per Task
                    </span>
                    <span className="text-green-400 font-medium">
                      ${pkg.reward_per_task}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Daily Income</span>
                    <span className="text-green-400 font-bold">
                      ${pkg.daily_income}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => buyPackage(pkg.id)}
                  disabled={loadingPackages[pkg.id]}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {loadingPackages[pkg.id] ? "Processing..." : "Buy Now"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;
