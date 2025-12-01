"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  fetchPackages,
  userBuyPackages,
} from "@/app/dashboard/package-lists/action";
import { useRouter } from "next/navigation";
import LoadingBar from "./MainLoading";
import { Session } from "@supabase/supabase-js";
import { getActivePackage } from "@/app/actions/getActivePackage";
import { useAuthStore } from "@/store";
import { getUserWallet } from "@/app/dashboard/wallet/action";

const PackageSelection: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletAmount, setWalletAmount] = useState<number | undefined>(0);
  const [loadingPackages, setLoadingPackages] = useState<{
    [key: number]: boolean;
  }>({});
  const [message, setMessage] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.userId);
  const [currPackage, setCurrPackage] = useState<any | null>(null);
  const router = useRouter();

  console.log("current user gbu", userId);

  // Load ALL data together in background - UI only shows when EVERYTHING is ready
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch ALL data in parallel - nothing shows until everything is loaded
        const [packagesRes, activePackageRes, userWalletRes] =
          await Promise.all([
            fetchPackages(),
            getActivePackage(userId ?? undefined),
            getUserWallet(userId ?? undefined),
          ]);

        // Set packages
        if (packagesRes.success) {
          setPackages(packagesRes.data ?? []);
        } else {
          console.log(packagesRes.error);
        }

        // Set active package
        if (activePackageRes?.success) {
          setCurrPackage(activePackageRes.data);
        } else {
          console.log(activePackageRes?.error);
        }

        if (userWalletRes?.success) {
          setWalletAmount(userWalletRes?.data);
        } else {
          console.log(userWalletRes?.message);
        }

        // NOW stop loading - everything is ready with correct button states
        setLoading(false);
      } catch (error) {
        console.error("Error initializing data:", error);
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Optimized: Memoized buy package handler with better UX
  const buyPackage = useCallback(
    async (packageId: number) => {
      console.log("Buying package:", packageId);

      // Check wallet balance before attempting purchase
      const selectedPackage = packages.find((pkg) => pkg.id === packageId);
      if (
        selectedPackage &&
        walletAmount !== undefined &&
        walletAmount < selectedPackage.price
      ) {
        alert(
          `Insufficient balance. You need $${
            selectedPackage.price
          } but have $${walletAmount.toFixed(2)}`
        );
        return;
      }

      try {
        setLoadingPackages((prev) => ({ ...prev, [packageId]: true }));

        const res = await userBuyPackages(packageId, userId ?? undefined);

        if (!res) {
          alert("No response from server");
          return;
        }

        if (!res.success) {
          alert(res.error || "Failed to purchase package");
          return;
        }

        console.log("Purchase response:", res.data);

        // Show success message briefly before redirecting
        setMessage(`Successfully purchased package!`);

        // Update local state to reflect purchase
        setCurrPackage({ package_id: packageId });

        // Redirect after a short delay so user sees success message
        setTimeout(() => {
          router.push("/dashboard/taskCenter");
        }, 1000);
      } catch (error) {
        console.error("Error buying package:", error);
        alert("An error occurred while purchasing the package");
      } finally {
        setLoadingPackages((prev) => ({ ...prev, [packageId]: false }));
      }
    },
    [router, packages, walletAmount]
  );

  const formattedWalletAmount = useMemo(() => {
    return walletAmount?.toFixed(2) ?? "0.00";
  }, [walletAmount]);

  // Optimized: Memoized navigation handler
  const navigateToWallet = useCallback(() => {
    router.push("/dashboard/wallet");
  }, [router]);

  // Optimized: Memoized package button renderer
  const renderPackageButton = useCallback(
    (pkg: any) => {
      const isActive = currPackage && currPackage.package_id === pkg.id;
      const hasOtherPackage = currPackage && currPackage.package_id !== pkg.id;
      const isLoading = loadingPackages[pkg.id];

      if (pkg.available_slots <= 0) {
        return (
          <button
            disabled
            className="w-full bg-gray-600 text-gray-300 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
          >
            No More Slots
          </button>
        );
      }

      if (isActive) {
        return (
          <div className="w-full bg-[#2723FF] text-white font-medium py-3 px-4 rounded-lg text-center">
            Active Package
          </div>
        );
      }

      if (hasOtherPackage) {
        return (
          <button
            disabled
            className="w-full bg-gray-600 text-gray-300 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
          >
            Unavailable
          </button>
        );
      }

      return (
        <button
          onClick={() => buyPackage(pkg.id)}
          disabled={isLoading}
          className="w-full bg-[#2723FF] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            "Buy Now"
          )}
        </button>
      );
    },
    [currPackage, loadingPackages, buyPackage]
  );

  // Optimized: Memoized wallet display
  const walletDisplay = useMemo(() => {
    return walletAmount?.toFixed(2) ?? "0.00";
  }, [walletAmount]);

  return (
    <div className="min-h-screen bg-[#201d4c] p-6">
      <div>
        <div className="mb-8 flex md:flex-row flex-col items-start md:items-center justify-between gap-5">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">
              Buy A Package
            </h1>
            <p className="text-white text-sm">
              Choose the package that fits your goals and start earning by
              completing tasks.
            </p>
          </div>

          <div className="w-fit rounded-[16px] flex justify-center items-center bg-[#2b2a5d] py-[25px] px-[20px] gap-2.5 mx-auto">
            <h2 className="text-white text-[20px] font-bold">
              ${formattedWalletAmount}
            </h2>
            <h2 className="text-white whitespace-nowrap">My balance</h2>
            <button
              className="w-fit bg-[#2723FF] hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors"
              onClick={navigateToWallet}
            >
              Deposit
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-4 text-center text-white bg-green-600 rounded-lg animate-pulse">
            {message}
          </div>
        )}

        {loading ? (
          <LoadingBar />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#2b2a54] backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200"
              >
                <div className="text-center mb-6">
                  <h2 className="text-white text-3xl font-bold mb-2">
                    {pkg.plan_name} - ${pkg.price}
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Available Slots</span>
                    <span className="text-white font-medium">
                      {pkg.available_slots}
                    </span>
                  </div>
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
                </div>

                {renderPackageButton(pkg)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelection;
