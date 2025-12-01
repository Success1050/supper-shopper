import React, { useEffect, useState, useMemo } from "react";
import HeaderDashboard from "./HeaderDashboard";
import { Clock } from "lucide-react";
import { ProductCard } from "./ProductCard";
import Progressbar from "./Progressbar";
import EarningsOverviewBox from "./Earning";
import { StatCard } from "./StatsCard";
import { RiTeamLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import EarningsSummary from "./smallscreenearningbox";
import { getUserSession, getUserWallet } from "@/app/dashboard/wallet/action";
import { Session } from "@supabase/supabase-js";
import { getTeamMembers } from "@/app/dashboard/myTeam/actions";
import { TeamMember } from "./MyTeam";
import LoadingBar from "./MainLoading";
import { getProducts } from "@/app/dashboard/taskCenter/action";
import { UserTaskWithProduct } from "./TaskCenter";
import UserEarnings from "./UserEarnings";

// Loading skeleton for products
const ProductSkeleton = () => (
  <div className="bg-[#2b2a5b] rounded-2xl border border-[#3b376c] p-4 animate-pulse">
    <div className="w-full h-32 bg-[#373575] rounded-lg mb-3"></div>
    <div className="h-4 bg-[#373575] rounded w-3/4"></div>
  </div>
);

const DashboardHome = () => {
  const [walletAmount, setWalletAmount] = useState<number | undefined>(0);
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<UserTaskWithProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  // Fetch all data in parallel on mount
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Fetch session, products, and team in parallel
        const [sessionRes, productsRes, teamRes] = await Promise.all([
          getUserSession(),
          getProducts(),
          getTeamMembers(),
        ]);

        // Set session
        if (sessionRes.success) {
          setUserSession(sessionRes.data ?? null);

          // Fetch wallet only after we have session
          if (sessionRes.data?.user?.id) {
            getUserWallet(sessionRes.data.user.id).then((walletRes) => {
              if (walletRes.success) {
                setWalletAmount(walletRes.data);
              }
            });
          }
        }

        // Set products
        if (productsRes.success) {
          setProducts(productsRes.data ?? []);
        }
        setProductsLoading(false);

        // Set team members
        if (teamRes && teamRes.success) {
          setTeamMembers(teamRes.data ?? []);
        }
      } catch (error) {
        console.error("Error initializing dashboard:", error);
        setProductsLoading(false);
      }
    };

    initializeDashboard();
  }, []); // Empty dependency array - only run once on mount

  // Memoize computed values
  const completedTask = useMemo(
    () => products.filter((product) => product.completed),
    [products]
  );

  const totalReward = useMemo(
    () =>
      completedTask.reduce<number>((acc, task) => acc + (task.reward ?? 0), 0),
    [completedTask]
  );

  return (
    <section className="w-full p-2 px-6 md:px-0 bg-[#201d4c]">
      <div className="md:hidden mb-3">
        <EarningsSummary walletAmount={walletAmount} />
      </div>

      <div className="md:hidden">
        <div className="flex justify-between items-center mb-4 md:px-0 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-white ">
            Active Products
          </h2>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {productsLoading ? "..." : products.length}
          </h2>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 w-full">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 w-full">
            {products.map((product: UserTaskWithProduct) => (
              <ProductCard
                key={product.id}
                productId={product.product_id}
                title={product.products.name}
                image={product?.products.image_url || "/images/product2.png"}
              />
            ))}
          </div>
        )}
      </div>

      <div className="md:grid grid-cols-1 lg:grid-cols-2 hidden px-8">
        <UserEarnings walletAmount={walletAmount} />

        <div>
          <div className="flex justify-start gap-20 items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white ">
              Active Products
            </h2>
            <h2 className="text-xl md:text-2xl font-bold text-white ">
              {productsLoading ? "..." : products.length}
            </h2>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 w-full">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 w-full">
              {products.map((product: UserTaskWithProduct) => (
                <ProductCard
                  key={product.id}
                  productId={product.product_id}
                  title={product.products.name}
                  image={product?.products.image_url || "/images/product2.png"}
                />
              ))}
            </div>
          ) : (
            <h2 className="text-white text-[20px] font-bold text-center">
              No active Tasks
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
