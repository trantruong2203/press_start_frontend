import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { ProductResponse } from "../../../interface/ProductResponse";
import type { SellerResponse } from "../../../interface/SellerResponse";
import type { CartItemsResponse } from "../../../interface/CartItemsRéponse";
import { useContext, useEffect, useMemo, useCallback } from "react";
import { getAllSellersThunk } from "../../../features/seller/SellerThunk";
import { createCartItemsThunk } from "../../../features/cart_items/CartItemsThunks";
import { ContextAuth } from "../../../contexts/AuthContext";
import { getOjectByEmail } from "../../../services/FunctionRepone";
import toast from "react-hot-toast";
import CardItems from "./CardItems";
import type { AppDispatch } from "../../../store/store";

import {
  formatCurrency,
  calculateDiscountedPrice,
} from "../../../services/FunctionRepone";

const isProductInCart = (
  cartItems: CartItemsResponse[],
  productId: number,
  userId: number
): boolean => {
  return cartItems.some(
    (item) => item.product_id === productId && item.user_id === userId
  );
};

// ============ Component ============

function BestsellerSection() {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const products = useSelector((state: RootState) => state.product.products);
  const sellers = useSelector((state: RootState) => state.seller.sellers);
  const users = useSelector((state: RootState) => state.users.users);
  const cartItems = useSelector(
    (state: RootState) => state.cartItems.cartItems
  );
  const { accountLogin } = useContext(ContextAuth);

  // Lấy thông tin user hiện tại
  const userInfo = useMemo(() => {
    return accountLogin ? getOjectByEmail(users, accountLogin.email) : null;
  }, [accountLogin, users]);

  // Load sellers khi component mount
  useEffect(() => {
    if (!sellers || sellers.length === 0) {
      dispatch(getAllSellersThunk());
    }
  }, [dispatch, sellers]);

  // Lọc sản phẩm active
  const activeProducts = useMemo(() => {
    return products.filter((product) => product.status === true);
  }, [products]);

  // Tạo map seller theo product ID để tối ưu performance
  const sellerMap = useMemo(() => {
    const map = new Map<number, SellerResponse>();
    sellers.forEach((seller) => {
      map.set(seller.product_id, seller);
    });
    return map;
  }, [sellers]);

  // Handler thêm vào giỏ hàng
  const handleAddToCart = useCallback(
    (productId: number) => {
      if (!userInfo) {
        toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
        return;
      }

      if (isProductInCart(cartItems, productId, userInfo.id)) {
        toast.error("Sản phẩm đã có trong giỏ hàng");
        return;
      }

      try {
        dispatch(
          createCartItemsThunk({
            product_id: productId,
            quantity: 1,
            user_id: userInfo.id,
            email: userInfo.email,
          })
        );
        toast.success("Thêm vào giỏ hàng thành công");
      } catch {
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    },
    [userInfo, cartItems, dispatch]
  );

  // Render product card với gradient border
  const renderProductCard = (product: ProductResponse) => {
    const seller = sellerMap.get(product.id);
    const hasDiscount = (seller?.discount ?? 0) > 0;
    const discountedPrice = calculateDiscountedPrice(seller);

    return (
      <div
        key={product.id}
        className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_-6px_rgba(34,211,238,0.8)] transition-all duration-500"
      >
        <CardItems
          it={product}
          sellers={sellers}
          hasDiscount={hasDiscount}
          discounted={discountedPrice}
          formatCurrency={formatCurrency}
          handleAddToCart={handleAddToCart}
        />
        {/* Glow effect on hover */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-30" />
      </div>
    );
  };

  return (
    <section className="mt-8">
      <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-wide mb-6">
        🔥 Game bán chạy
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeProducts.map(renderProductCard)}
      </div>
    </section>
  );
}

export default BestsellerSection;
