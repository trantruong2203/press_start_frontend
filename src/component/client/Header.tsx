import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSteam,
  FaGamepad,
  FaXbox,
  FaUserShield,
} from "react-icons/fa";
import { SiEa } from "react-icons/si";
import { useContext, useEffect, useMemo, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ContextAuth } from "../../contexts/AuthContext";
import UserModal from "./modal/UserModal";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { getOjectByEmail } from "../../services/FunctionRepone";
import { getAllCartItemsThunk } from "../../features/cart_items/CartItemsThunks";
import { setCartOpen } from "../../features/cart_items/CartItemsSlices";
import CartMenu from "./home/CartMenu";

function Header({ handleOpen }: { handleOpen: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accountLogin } = useContext(ContextAuth);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [openCartMenu, setOpenCartMenu] = useState(false); // Removed local state
  const navigate = useNavigate();
  const navigationItems = [
    {
      name: "Game Steam",
      icon: <FaSteam color="white" />,
      color: "from-orange-400 to-orange-600",
    },
    {
      name: "Game Online",
      icon: <FaGamepad color="white" />,
      color: "from-green-400 to-green-600",
    },
    {
      name: "Xbox Game Pass",
      icon: <FaXbox color="white" />,
      color: "from-green-500 to-green-700",
    },
    {
      name: "Game EA",
      icon: <SiEa color="white" />,
      color: "from-red-400 to-red-600",
    },
    {
      name: "Tài Khoản",
      icon: <FaUserShield color="white" />,
      color: "from-blue-400 to-blue-600",
    },
  ];

  const cartItems = useSelector(
    (state: RootState) => state.cartItems.cartItems
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isCartOpen = useSelector(
    (state: RootState) => (state.cartItems as any).isCartOpen
  );
  const products = useSelector((state: RootState) => state.product.products);
  const users = useSelector((state: RootState) => state.users.users);
  const userId = getOjectByEmail(users, accountLogin?.email ?? "")?.id;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!accountLogin) return;
    dispatch(getAllCartItemsThunk());
  }, [dispatch, accountLogin]);

  const cartItemsCount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    if (userId) {
      return cartItems.filter((item) => item.user_id === userId).length;
    }
    return cartItems.filter((item) => item.user_id === 0).length;
  }, [cartItems, userId]);

  const userCartItems = useMemo(() => {
    if (!Array.isArray(cartItems)) return [] as typeof cartItems;
    if (userId) {
      return cartItems.filter((item) => item.user_id === userId);
    }
    return cartItems.filter((item) => item.user_id === 0);
  }, [cartItems, userId]);

  const productById = useMemo(() => {
    const mapping: Record<
      number,
      { id: number; name?: string; banner_url?: string }
    > = {};
    (products ?? []).forEach((p) => {
      if (p && typeof (p as { id?: number }).id === "number") {
        const prod = p as { id: number; name?: string; banner_url?: string };
        mapping[prod.id] = prod;
      }
    });
    return mapping;
  }, [products]);

  return (
    <header className="bg-gray-900 sticky top-0 z-50 w-full border-b border-cyan-400/30 shadow-lg shadow-cyan-400/20">
      <div className="max-w-7xl mx-auto px-3 py-2 sm:px-4 lg:px-6">
        {/* Main Header - Compact */}
        <div className="flex items-center justify-between h-12 ">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            <div
              className="w-10 h-10 relative group"
              onClick={() => {
                try {
                  navigate("/");
                } catch (error) {
                  console.error("Navigation failed:", error);
                }
              }}
            >
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:bg-cyan-400/30 transition-all duration-300"></div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-cyan-400 text-sm" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-cyan-400/30 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/60 hover:border-cyan-400/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {accountLogin ? (
              <div
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="cursor-pointer group relative px-4 py-1.5 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-md hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <FaUser className="inline-block mr-1.5 text-xs" />
                <span className="font-medium text-sm">Cá nhân</span>
              </div>
            ) : (
              <Link
                to="/login"
                className="group relative px-4 py-1.5 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-md hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <FaUser className="inline-block mr-1.5 text-xs" />
                <span className="font-medium text-sm">Đăng nhập</span>
              </Link>
            )}

            <div className="relative group">
              <Badge badgeContent={cartItemsCount} color="primary">
                <button
                  onClick={() => dispatch(setCartOpen(true))}
                  className="px-4 py-1.5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 rounded-md hover:from-cyan-400/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  <FaShoppingCart className="inline-block mr-1.5 text-xs" />
                  <span className="font-medium text-sm">Giỏ hàng</span>
                </button>
              </Badge>
              <div className="absolute z-50 right-2 mt-2 w-72 p-4 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Giỏ hàng của bạn
                </h3>
                {userCartItems.length === 0 ? (
                  <p className="text-gray-600 text-sm">Chưa có sản phẩm nào.</p>
                ) : (
                  <div>
                    <ul className="space-y-2 max-h-64 overflow-auto">
                      {userCartItems.slice(0, 3).map((ci) => {
                        const p = productById[ci.product_id];
                        return (
                          <li
                            key={ci.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {p?.banner_url ? (
                                <img
                                  src={p.banner_url}
                                  alt={p?.name ?? "product"}
                                  className="w-8 h-8 rounded object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded bg-gray-200" />
                              )}
                              <span className="text-gray-800 text-sm truncate max-w-[9rem]">
                                {p?.name ?? `Sản phẩm #${ci.product_id}`}
                              </span>
                            </div>
                            <span className="text-gray-600 text-sm">
                              x{ci.quantity}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    {userCartItems.length > 3 && (
                      <div className="mt-2 text-right text-xs text-gray-500">
                        +{userCartItems.length - 3} sản phẩm nữa
                      </div>
                    )}
                    <div
                      onClick={() => dispatch(setCartOpen(true))}
                      className="mt-3 inline-block w-full text-center px-3 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
                    >
                      Xem giỏ hàng
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-md text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              {isMenuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Bar - Compact */}
        <div className="border-t border-cyan-400/20 mt-2">
          <div className="flex items-center justify-between py-2">
            {/* Categories Button */}
            <button
              onClick={handleOpen}
              className="group relative px-4 py-1.5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 rounded-md hover:from-cyan-400/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] font-medium"
            >
              <FaBars className="inline-block mr-1.5 text-sm" />
              <span className="text-sm">Danh mục</span>
            </button>

            {/* Navigation Items - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  className="group relative px-3 py-1 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-1.5">
                    <div
                      className={`text-transparent bg-gradient-to-r ${item.color} bg-clip-text group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-medium text-xs whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden">
              <button className="p-1.5 text-cyan-400 hover:bg-cyan-400/10 rounded-md transition-all duration-300">
                <FaBars className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-cyan-400/30 bg-gray-800/95 backdrop-blur-sm mt-2">
            <div className="px-3 py-3 space-y-3">
              {/* Mobile Search */}
              <div className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-cyan-400 text-sm" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/80 border border-cyan-400/30 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/60 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                <button className="flex items-center justify-center px-3 py-2 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-md hover:bg-cyan-400/10 transition-all duration-300">
                  <FaUser className="mr-2 text-sm" />
                  <span className="font-medium text-sm">Đăng nhập</span>
                </button>
                <Badge badgeContent={cartItemsCount} color="primary">
                  <button className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 rounded-md hover:from-cyan-400/30 hover:to-blue-500/30 transition-all duration-300">
                    <FaShoppingCart className="mr-2 text-sm" />
                    <span className="font-medium text-sm">Giỏ hàng</span>
                  </button>

                  <div className="absolute left-0 mt-2 w-64 p-4 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Modal Title
                    </h3>
                    <p className="text-gray-600">
                      This modal appears when you hover over the button.
                    </p>
                  </div>
                </Badge>
              </div>

              {/* Mobile Categories */}
              <div className="border-t border-cyan-400/20 pt-3">
                <h3 className="text-cyan-400 font-medium mb-2 text-sm">
                  Danh mục
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {navigationItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center p-2 bg-gray-700/50 border border-gray-600/30 rounded-md hover:bg-gray-600/50 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <div
                        className={`text-transparent bg-gradient-to-r ${item.color} bg-clip-text mr-1.5`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-gray-300 text-xs font-medium">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Modal - render outside of buttons */}
      {accountLogin && (
        <UserModal
          openUserMenu={openUserMenu}
          accountLogin={accountLogin}
          onClose={() => setOpenUserMenu(false)}
        />
      )}

      <CartMenu
        open={!!isCartOpen}
        onClose={() => dispatch(setCartOpen(false))}
        userCartItems={userCartItems}
        productById={productById}
      />
    </header>
  );
}

export default Header;
