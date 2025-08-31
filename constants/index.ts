// data/constants.ts

import { Antenna } from "lucide-react";

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$10",
    period: "Per Day",
    isPopular: false,
    features: [
      "5 Tasks Per Day",
      "$2 Per Task",
      "$300 Monthly Potential",
      "Affiliate Bonuses Included",
      "24/7 Support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$50",
    period: "Per Day",
    isPopular: true,
    features: [
      "10 Tasks Per Day",
      "$5 Per Task",
      "$1,500 Monthly Potential",
      "Affiliate Bonuses Included",
      "24/7 Support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$160",
    period: "Per Day",
    isPopular: false,
    features: [
      "20 Tasks Per Day",
      "$8 Per Task",
      "$4,800 Monthly Potential",
      "Affiliate Bonuses Included",
      "24/7 Support",
    ],
  },
];

export const commissionStructure = [
  {
    id: "subscriptions",
    title: "Direct Bonus From Subscriptions",
    percentage: "25%",
    description:
      "Earn 25% commission on every subscription your referrals make",
    icon: "dollar",
  },
  {
    id: "daily-tasks",
    title: "Direct Bonus From Daily Tasks",
    percentage: "25%",
    description: "Get 25% of daily task earnings from your direct referrals",
    icon: "user",
  },
  {
    id: "career-rank",
    title: "Career Rank Bonuses",
    percentage: "Up To 50%",
    description: "Team based rewards that increase with your leadership rank",
    icon: "trophy",
  },
];

export const careerRankLevels = [
  {
    id: "bronze",
    name: "BRONZE",
    teamVolume: "$10K",
    weeklyBonus: "$50/WEEK",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    id: "silver",
    name: "SILVER",
    teamVolume: "$50K",
    weeklyBonus: "$150/WEEK",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    id: "gold",
    name: "GOLD",
    teamVolume: "$100K",
    weeklyBonus: "$500/WEEK",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    id: "platinum",
    name: "PLATINUM",
    teamVolume: "$500K",
    weeklyBonus: "$2,500/WEEK",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
];

export const salaryRewards = {
  weekly: {
    title: "Weekly Salary",
    amount: "$500/Week",
    details: {
      personalVolume: "$2,000",
      teamVolume: "$20,000",
      weeklyBonus: "$500",
    },
  },
  monthly: {
    title: "Monthly Salary",
    amount: "$3,000/Month",
    details: {
      personalVolume: "$10,000",
      teamVolume: "$100,000",
      monthlyBonus: "$3,000",
    },
  },
};

export const teamVolumeBonusTiers = [
  { volume: "$10K", tier: "Team Volume", period: "$50" },
  { volume: "$25K", tier: "Team Volume", period: "$100" },
  { volume: "$50K", tier: "Team Volume", period: "$150" },
  { volume: "$100K", tier: "Team Volume", period: "$300" },
  { volume: "$250K", tier: "Team Volume", period: "$750" },
  { volume: "$500K", tier: "Team Volume", period: "$1500" },
  { volume: "$1M", tier: "Team Volume", period: "$5,000" },
  { volume: "$5M", tier: "Team Volume", period: "$25,000" },
  {
    volume: "$10M",
    tier: "Team Volume",
    period: "$50,000",
  },
  {
    volume: "$50M",
    tier: "Team Volume",
    period: "$100,000",
  },
  {
    volume: "$100M",
    tier: "Team Volume",
    period: "$150,000",
  },
];

export const businessStats = {
  monthlyViews: "2M+",
  dailyClicks: "150K+",
  description:
    "Leverage our platform to drive traffic, increase sales, and grow your online presence with targeted marketing packages.",
};

export const lotteryData = {
  title: "WIN EXCITING REWARDS",
  subtitle:
    "Every completed task gives you a chance to win amazing prizes. The more you participate, the higher your chances!",
  note: "Weekly drawings - Fair & transparent - Great prizes",
  steps: [
    {
      id: "01",
      title: "Complete Tasks",
      description: "Each completed task earns you lottery tickets",
    },
    {
      id: "02",
      title: "Weekly Drawings",
      description: "Winners are selected every Sunday evening",
    },
    {
      id: "03",
      title: "Claim Your Prize",
      description:
        "Winners are notified and prizes are delivered within 30 days",
    },
  ],
};

export const withdrawalFeatures = [
  {
    id: "minimum",
    title: "Minimum Withdrawal $10",
    description: "Low minimum threshold for easy access to your earnings",
    icon: "dollar",
  },
  {
    id: "processing",
    title: "Processing Time 12-72 Hours",
    description: "Fast processing for quick access to your funds",
    icon: "clock",
  },
  {
    id: "fee",
    title: "Fee 10%",
    description: "Winners are notified and prizes are delivered within 30 days",
    icon: "card",
  },
];

export const whyChooseFeatures = [
  {
    id: "transparent",
    title: "Transparent & Reliable",
    description: "Clear earning model with verifiable payouts.",
    icon: "shield",
  },
  {
    id: "rewards",
    title: "C Rewards",
    description: "Earn profits every single day through simple tasks.",
    icon: "coins",
  },
  {
    id: "affiliate",
    title: "Affiliate Program",
    description: "Extra income by building your own network.",
    icon: "users",
  },
  {
    id: "lifetime",
    title: "Lifetime Bonus Potential",
    description: "Rank-based rewards and long-term income streams.",
    icon: "target",
  },
];

export const faqData = [
  {
    id: 1,
    question: "How does Super Shopper work?",
    answer:
      "Super Shopper connects brands with users who complete simple daily tasks. Users complete simple daily tasks, earn profits, and select brands from increased product sales and exposure.",
  },
  {
    id: 2,
    question: "How can I start earning?",
    answer:
      "Getting started is simple! Sign up for an account, choose your investment plan, fund your account, and start completing daily tasks to earn profits immediately.",
  },
  {
    id: 3,
    question: "What payment methods are supported?",
    answer:
      "We support multiple payment methods including bank transfers, Bitcoin, USDT, and other major cryptocurrencies for both funding your account and receiving withdrawals.",
  },
  {
    id: 4,
    question: "Is my money safe?",
    answer:
      "Yes, your funds are protected with bank-level security, encrypted transactions, and we offer a 7-day money-back guarantee on all plans for your peace of mind.",
  },
  {
    id: 5,
    question: "How do withdrawals work?",
    answer:
      "Withdrawals are processed within 12-72 hours. You can withdraw your earnings daily with a minimum of $10. We charge a 10% processing fee and support multiple cryptocurrency options.",
  },
];

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Subscription Plans", href: "/subscription-plans" },
  { label: "Affiliate Program", href: "/affiliate-program" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Accessibility", href: "/accessibility" },
];

export const Lists = [
  {
    id: 1,
    items: [
      "Create your free account",
      "Select a subscription plan (starting from $10 up to $2500)",
      "Higher plans = more daily tasks + higher income",
    ],
  },

  {
    id: 2,
    items: [
      "Every plan unlocks a set number of tasks",
      "Tasks are quick and simple to complete",
      "Daily rewards instantly added to your account",
    ],
  },
  {
    id: 3,
    items: [
      "Rewards available immediately after task completion",
      "Income grows based on your plan + consistency",
      "Monthly income potential shown on plans page",
    ],
  },
];

export const whyChooseSuperShopper = [
  {
    id: 1,
    image: "/images/img4.png",
    header: "Transparent & Reliable",
    content: "Clear earning model with verifiable payouts.",
  },
  {
    id: 2,
    image: "/images/img5.png",
    header: "c Rewards",
    content: "Earn profits every single day through simple tasks.",
  },
  {
    id: 3,
    image: "/images/img6.png",
    header: "Affiliate Program",
    content: "Extra income by building your own network.",
  },
  {
    id: 4,
    image: "/images/img7.png",
    header: "Lifetime Bonus Potential",
    content: "Rank-based rewards and long-term income streams.",
  },
];
