import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import type { CartItemsResponse } from "../../../interface/CartItemsRéponse";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import PaymentButton from "../payOsCheckOut";
import { formatCurrency } from "../../../services/FunctionRepone";

type Anchor = "right";

export default function CartMenu({
  open,
  onClose,
  userCartItems,
  productById,
}: {
  open: boolean;
  onClose: () => void;
  userCartItems: CartItemsResponse[];
  productById: Record<
    number,
    { id: number; name?: string; banner_url?: string }
  >;
}) {
  const anchor: Anchor = "right";
  const sellers = useSelector((state: RootState) => state.seller.sellers);
  const handleClose = () => {
    onClose();
  };

  const totalPrice = userCartItems.reduce(
    (acc, ci) =>
      acc +
      ci.quantity *
        (sellers.find((s) => s.product_id === ci.product_id)?.price_original ??
          0),
    0
  );

  const list = (
    <Box
      sx={{ width: 360 }}
      role="presentation"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="flex h-[100vh] flex-col bg-zinc-900 text-zinc-100">
        <div className="p-4 border-b border-zinc-800">
          <h3 className="font-semibold text-white">Giỏ hàng của bạn</h3>
        </div>

        <div className=" overflow-auto" style={{ maxHeight: 420 }}>
          {userCartItems.length === 0 ? (
            <p className="text-zinc-400 text-sm">Chưa có sản phẩm nào.</p>
          ) : (
            <ul>
              {userCartItems.slice(0, 3).map((ci) => {
                const p = productById[ci.product_id];
                return (
                  <li
                    key={ci.id}
                    className="p-3 relative group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <img
                        src={p?.banner_url}
                        alt={p?.name ?? "product"}
                        className="w-20 h-20 rounded-md object-cover border border-zinc-800"
                      />
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-zinc-100 text-sm truncate max-w-[10rem]">
                          {p?.name ?? `Sản phẩm #${ci.product_id}`}
                        </span>
                        <button className="text-rose-400 hover:text-rose-300 text-xs text-left w-fit">
                          tồn kho:{" "}
                          {sellers.find((s) => s.product_id === ci.product_id)
                            ?.stock ?? 0}
                        </button>
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="text-rose-400 hover:text-rose-300 text-sm"
                        aria-label="Xóa sản phẩm"
                      >
                        <IoIosCloseCircleOutline
                          onClick={() => {
                            toast.success("Xóa sản phẩm thành công");
                          }}
                          size={20}
                        />
                      </button>
                    </div>
                    <div>
                      <span className="text-zinc-100 text-sm font-semibold">
                        {formatCurrency(
                          ci.quantity *
                            (sellers.find((s) => s.product_id === ci.product_id)
                              ?.price_original ?? 0)
                        )}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {userCartItems.length > 3 && (
            <div className="text-right text-xs text-zinc-500">
              +{userCartItems.length - 3} sản phẩm nữa
            </div>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-zinc-800 bg-zinc-950/60 backdrop-blur">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="w-full p-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-500"
            />
            <button className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm shrink-0">
              Áp dụng
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-zinc-400 text-sm">Tổng tiền</span>
            <span className="text-zinc-100 font-semibold">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          <div className="text-gray-400 font-semibold text-xs pt-2">
            Thông tin tài khoản game sẽ được gửi về Email của bạn.
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950/60 backdrop-blur">
          <h5 className="text-zinc-100 font-semibold pb-2">
            Email nhận thông tin tài khoản
          </h5>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-500"
          />
          <PaymentButton />
        </div>
      </div>
    </Box>
  );

  return (
    <Drawer anchor={anchor} open={open} onClose={handleClose}>
      {list}
    </Drawer>
  );
}
