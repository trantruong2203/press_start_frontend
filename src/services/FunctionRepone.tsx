import type { PlatformResponse } from "../interface/PlatformResponse";
import type { UserResponse } from "../interface/UserResponse";
import type { SellerResponse } from "../interface/SellerResponse";

export const getOjectByEmail = (data: UserResponse[], email: string) => {
  return data?.find((e: UserResponse) => e.email === email);
};

export const getObjectById = <T extends { id: number | string }>(
  data: T[],
  id: number | string
) => {
  return data?.find((e: T) => e.id === id);
};

export const getObjectByPlatformId = (
  data: PlatformResponse[],
  platformId: number
) => {
  return data?.find((e: PlatformResponse) => e.id === platformId);
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

export const calculateDiscountedPrice = (
  seller: SellerResponse | undefined
): number => {
  if (!seller) return 0;
  const discount = Math.max(0, Math.min(100, seller.discount || 0));
  return Math.round(seller.price_original * (1 - discount / 100));
};
