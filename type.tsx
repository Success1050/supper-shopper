import { ReactNode } from "react";

export interface TeamMember {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  country: string | null;
  referral_code: string | null;
  personal_referral_code: string | null;
  referrer_id: string | null;
  level: number;
  created_at: string;
}

export interface HistoryRecord {
  id: string;
  created_at: string;
  type: string;
  status?: "Completed" | "Processing";
  amount: string;
  color: string;
}

export interface ProfileTypes {
  id: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  mobilenumber: string;
  address: string;
  profile_img: string;
  dob: string;
  gender: string;
  country_rank: number;
  first_name: string;
  last_name: string;
  personal_referral_code: string;
  role: string;
}

export interface WalletAddressData {
  currency: string;
  network: string;
  walletAddress: string;
  confirmWalletAddress: string;
}

export interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface WalletAddressFormProps {
  onBack?: () => void;
  walletId?: string;
  initialData?: WalletFormData;
}

export interface WalletFormData {
  currency: string;
  network: string;
  walletAddress: string;
  confirmWalletAddress: string;
}

export interface SavedWallet {
  id: string;
  currency: string;
  network: string;
  wallet_address: string;
  created_at: string;
}

export interface NavItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  url: string;
}

export interface ClientLayoutProps {
  children: ReactNode;
  session?: any;
}