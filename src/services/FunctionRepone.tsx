import type { PlatformResponse } from "../interface/PlatformResponse";
import type { UserResponse } from "../interface/UserResponse";

export const getOjectByEmail = (data: UserResponse[], email: string) => {
    return data?.find((e: UserResponse) => e.email === email);
};

export const getObjectById = <T extends { id: number | string }>(data: T[], id: number | string) => {
    return data?.find((e: T) => e.id === id);
};

export const getObjectByPlatformId = (data: PlatformResponse[], platformId: number) => {
    return data?.find((e: PlatformResponse) => e.id === platformId);
};

export const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

