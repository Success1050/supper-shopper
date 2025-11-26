"use client";
import React, { useEffect, useState } from "react";
import {
  fetchPackages,
  userBuyPackages,
} from "@/app/dashboard/package-lists/action";
import { useRouter } from "next/navigation";
import LoadingBar from "./MainLoading";

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
          <p className="text-white text-sm">
            Choose the package that fits your goals and start earning by
            completing tasks.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mb-4">
          <button className="w-[177px] px-[49px] py-[25px] bg-[#2723FF] text-center rounded-[12px] text-white">
            Pre-Enter
          </button>
          <button className="w-[177px] px-[49px] whitespace-nowrap py-[25px] bg-[#2723FF] text-center rounded-[12px] text-white">
            Beta Launch
          </button>
        </div>

        <div className="w-[350px] rounded-[16px] flex justify-center items-center bg-[#2b2a5d] py-[25px] px-[30px] gap-2.5 mb-4">
          <h2 className="text-white text-[20px] font-bold">$0.00</h2>
          <h2 className="text-white">My available balance</h2>
        </div>

        {message && (
          <div className="mb-4 text-center text-yellow-300">{message}</div>
        )}

        {loading ? (
          <LoadingBar />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#2b2a54] backdrop-blur-sm rounded-lg p-6 border border-gray-700/50"
              >
                <div className="text-center mb-6">
                  <h2 className="text-white text-3xl font-bold mb-2">
                    {pkg.plan_name} - ${pkg.price}
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Tasks/Day</span>
                    <span className="text-white font-medium">
                      {pkg.tasks_per_day}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Reward/Task</span>
                    <span className="text-green-400 font-medium">
                      ${pkg.reward_per_task}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Daily Income</span>
                    <span className="text-green-400 font-bold">
                      ${pkg.daily_income}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Daily ROI %</span>
                    <span className="text-green-400 font-bold">
                      {pkg.percent_reward ?? 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">ROI Cap</span>
                    <span className="text-green-400 font-medium">
                      {pkg.Renewable_package}%
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Maximum Payout</span>
                    <span className="text-green-400 font-bold">
                      ${pkg.max_payout ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">
                      Days to reach max. ROI
                    </span>
                    <span className="text-green-400 font-bold">
                      {pkg.days_to_reach_max_roi ?? 0} Days
                    </span>
                  </div> */}
                </div>

                <button
                  onClick={() => buyPackage(pkg.id)}
                  disabled={loadingPackages[pkg.id]}
                  className="w-full bg-[#2723FF] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {loadingPackages[pkg.id] ? "Processing..." : "Buy Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelection;
