import React, { useEffect, useState } from "react";
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

const DashboardHome = () => {
  const [walletAmount, setWalletAmount] = useState<number | undefined>(0);
  const [userSession, setusersession] = useState<Session | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [products, setProducts] = useState<UserTaskWithProduct[]>([]);

  const getWalletBal = async () => {
    const res = await getUserWallet(userSession?.user?.id);
    if (!res.success) {
      return;
    }

    console.log("user balance", res.data);

    setWalletAmount(res?.data);
  };

  const fetchUserSession = async () => {
    const res = await getUserSession();
    if (!res.success) {
      return;
    }
    setusersession(res?.data ?? null);
  };

  useEffect(() => {
    getWalletBal();
    fetchUserSession();
  }, [userSession?.user?.id]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const res = await getTeamMembers();
      if (res && res.success) {
        console.log("Team Data:", res.data);
        setTeamMembers(res.data ?? []);
      } else {
        console.log("Error loading team", res?.error);
      }
      setloading(false);
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      if (!res.success) return console.log("an error occured");
      setProducts(res.data ?? []);
    };
    fetchProducts();
  }, []);

  console.log("products listed:", products);

  const completedTask = products.filter((product) => product.completed);

  const totalReward = completedTask.reduce<number>(
    (acc, task) => acc + (task.reward ?? 0),
    0
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
            {products.length}
          </h2>
        </div>

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
      </div>

      <div className="md:grid grid-cols-1 lg:grid-cols-2 hidden px-8">
        <UserEarnings walletAmount={walletAmount} />

        <div>
          <div className="flex justify-start gap-20 items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white ">
              Active Products
            </h2>
            <h2 className="text-xl md:text-2xl font-bold text-white ">
              {products.length}
            </h2>
          </div>

          {products.length > 0 ? (
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
