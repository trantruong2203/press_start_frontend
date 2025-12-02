import Drawer from "@mui/material/Drawer";
import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import PaymentButton from "../payOsCheckOut";
import { formatCurrency } from "../../../services/FunctionRepone";
import type { CartItemsResponse } from "../../../interface/CartItemsRéponse";
import type { RootState } from "../../../store/store";

interface ProductInfo {
  id: number;
  name?: string;
  banner_url?: string;
}

interface CartMenuProps {
  open: boolean;
  onClose: () => void;
  userCartItems: CartItemsResponse[];
  productById: Record<number, ProductInfo>;
}

export default function CartMenu({
  open,
  onClose,
  userCartItems,
  productById,
}: CartMenuProps) {
  const sellers = useSelector((state: RootState) => state.seller.sellers);

  const getSellerInfo = useCallback(
    (productId: number) => {
      return sellers.find((s) => s.product_id === productId);
    },
    [sellers]
  );

  const totalPrice = useMemo(() => {
    return userCartItems.reduce((acc, ci) => {
      const seller = getSellerInfo(ci.product_id);
      return acc + ci.quantity * (seller?.price_original ?? 0);
    }, 0);
  }, [userCartItems, getSellerInfo]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        className="w-[360px] flex h-full flex-col bg-zinc-900 text-zinc-100"
        role="presentation"
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      >
        <div className="p-4 border-b border-zinc-800">
          <h3 className="font-semibold text-white">Giỏ hàng của bạn</h3>
        </div>

        <div className="overflow-auto max-h-[420px]">
          {userCartItems.length === 0 ? (
            <div className="p-4 text-zinc-400 text-sm">
              Chưa có sản phẩm nào.
            </div>
          ) : (
            <ul>
              {userCartItems.slice(0, 3).map((ci) => {
                const p = productById[ci.product_id];
                const seller = getSellerInfo(ci.product_id);
                const price = seller?.price_original ?? 0;
                const stock = seller?.stock ?? 0;

                return (
                  <li
                    key={ci.id}
                    className="p-3 relative group flex items-center justify-between border-b border-zinc-800/50 last:border-0"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <img
                        src={p?.banner_url}
                        alt={p?.name ?? "product"}
                        className="w-20 h-20 rounded-md object-cover border border-zinc-800"
                      />
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className="text-zinc-100 text-sm truncate max-w-[10rem]"
                          title={p?.name}
                        >
                          {p?.name ?? `Sản phẩm #${ci.product_id}`}
                        </span>
                        <span className="text-rose-400 text-xs">
                          tồn kho: {stock}
                        </span>
                      </div>
                    </div>

                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="text-rose-400 hover:text-rose-300 transition-colors"
                        aria-label="Xóa sản phẩm"
                        onClick={() => toast.success("Xóa sản phẩm thành công")}
                      >
                        <IoIosCloseCircleOutline size={20} />
                      </button>
                    </div>

                    <div className="ml-2 shrink-0">
                      <span className="text-zinc-100 text-sm font-semibold">
                        {formatCurrency(ci.quantity * price)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {userCartItems.length > 3 && (
            <div className="p-2 text-right text-xs text-zinc-500">
              +{userCartItems.length - 3} sản phẩm nữa
            </div>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-zinc-800 bg-zinc-950/60 backdrop-blur">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="w-full p-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm shrink-0 transition-colors">
              Áp dụng
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-zinc-400 text-sm">Tổng tiền</span>
            <span className="text-zinc-100 font-semibold text-lg">
              {formatCurrency(totalPrice)}
            </span>
          </div>

          <div className="text-zinc-500 font-medium text-xs pt-2">
            Thông tin tài khoản game sẽ được gửi về Email của bạn.
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950/60 backdrop-blur space-y-3">
          <div>
            <label className="block text-zinc-100 font-semibold text-sm mb-2">
              Email nhận thông tin tài khoản
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <PaymentButton />
        </div>
      </div>
    </Drawer>
  );
}
