import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { ProductResponse } from "../../../interface/ProductResponse";
import type { SellerResponse } from "../../../interface/SellerResponse";
import type { CartItemsResponse } from "../../../interface/CartItemsRéponse";
import { useContext, useEffect } from "react";
import { getAllSellersThunk } from "../../../features/seller/SellerThunk";
import { createCartItemsThunk } from "../../../features/cart_items/CartItemsThunks";
import { ContextAuth } from "../../../contexts/AuthContext";
import { getOjectByEmail } from "../../../services/FunctionRepone";
import toast from "react-hot-toast";
import CardItems from "./CardItems";

function BestsellerSection() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.product.products);
  const sellers = useSelector((state: RootState) => state.seller.sellers);
  const { accountLogin } = useContext(ContextAuth);
  const users = useSelector((state: RootState) => state.users.users);
  const userInfo = accountLogin
    ? getOjectByEmail(users, accountLogin.email)
    : null;
  const cartItems = useSelector(
    (state: RootState) => state.cartItems.cartItems
  );

  useEffect(() => {
    if (!sellers || sellers.length === 0) {
      // Tải toàn bộ sellers một lần để có dữ liệu cho tất cả products
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dispatch as any)(getAllSellersThunk());
    }
  }, [dispatch, sellers]);

  const formatCurrency = (value: number | string) => {
    const numberValue = typeof value === "string" ? Number(value) : value;
    if (Number.isNaN(numberValue)) return String(value);
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numberValue);
  };

  const handleAddToCart = (productId: number) => {
    try {
      if (
        cartItems.find(
          (item: CartItemsResponse) =>
            item.product_id === productId && item.user_id === userInfo?.id
        )
      ) {
        toast.error("Sản phẩm đã có trong giỏ hàng");
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dispatch as any)(
        createCartItemsThunk({
          product_id: productId,
          quantity: 1,
          user_id: userInfo?.id ?? 0,
          email: userInfo?.email ?? "",
        })
      );
      toast.success("Thêm vào giỏ hàng thành công");
    } catch (error) {
      console.error(error);
    }
  };

  const getDiscountedPrice = (product: SellerResponse | undefined): number => {
    if (!product) return 0;
    const d = Math.max(0, Math.min(100, product.discount || 0));
    return Math.round(product.price_original * (1 - d / 100));
  };

  return (
    <section className="mt-8">
      <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-wide">
        Game bán chạy
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items
          .filter((p: ProductResponse) => p.status === true)
          .map((it: ProductResponse) => {
            const hasDiscount =
              (sellers.find(
                (seller: SellerResponse) => seller.product_id === it.id
              )?.discount ?? 0) > 0;
            const discounted = getDiscountedPrice(
              sellers.find(
                (seller: SellerResponse) => seller.product_id === it.id
              )
            );
            return (
              <div key={it.id} className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_-6px_rgba(34,211,238,0.8)] transition-shadow">
                  <CardItems
                    it={it}
                    sellers={sellers}
                    hasDiscount={hasDiscount}
                    discounted={discounted}
                    formatCurrency={formatCurrency}
                    handleAddToCart={handleAddToCart}
                  />
                  <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 opacity-0 blur-lg transition-opacity group-hover:opacity-30" />
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default BestsellerSection;
