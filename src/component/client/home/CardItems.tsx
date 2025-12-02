import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaPlay, FaHeart, FaShoppingCart } from "react-icons/fa";
import type { SellerResponse } from "../../../interface/SellerResponse";
import type { ProductResponse } from "../../../interface/ProductResponse";
import { useNavigate } from "react-router-dom";

function CardItems({
  it,
  sellers,
  hasDiscount,
  discounted,
  formatCurrency,
  handleAddToCart,
}: {
  it: ProductResponse;
  sellers: SellerResponse[];
  hasDiscount: boolean;
  discounted: number;
  formatCurrency: (value: number) => string;
  handleAddToCart: (productId: number) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="h-full  ">
      <Card className="h-full flex flex-col bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-800/95 backdrop-blur-xl overflow-hidden group transition-all duration-500">
        <div
          className="relative cursor-pointer overflow-hidden"
          onClick={() => navigate(`/production-detail/${it.id}`)}
        >
          <CardMedia
            component="div"
            className="h-56 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${it.banner_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Tooltip title="Xem trailer" arrow>
              <button className="cursor-pointer h-11 w-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white grid place-items-center shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-110 active:scale-95">
                <FaPlay size={14} />
              </button>
            </Tooltip>
            <Tooltip title="Yêu thích" arrow>
              <button className="cursor-pointer h-11 w-11 rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white grid place-items-center shadow-lg shadow-fuchsia-500/50 hover:shadow-xl hover:shadow-fuchsia-500/70 transition-all duration-300 hover:scale-110 active:scale-95">
                <FaHeart size={14} />
              </button>
            </Tooltip>
          </div>

          {/* Stock Badge */}
          <Chip
            label={`Kho: ${
              sellers.find(
                (seller: SellerResponse) => seller.product_id === it.id
              )?.stock ?? 0
            }`}
            size="small"
            className={`!absolute !left-3 !top-3 !font-semibold !text-white !shadow-lg !backdrop-blur-sm ${
              sellers.find(
                (seller: SellerResponse) => seller.product_id === it.id
              )?.stock ?? 0 > 0
                ? "!bg-gradient-to-r !from-emerald-500 !to-green-600"
                : "!bg-gradient-to-r !from-orange-500 !to-red-600"
            }`}
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <Chip
              label={`-${
                sellers.find(
                  (seller: SellerResponse) => seller.product_id === it.id
                )?.discount ?? 0
              }%`}
              size="small"
              className="!absolute !right-3 !top-3 !bg-gradient-to-r !from-rose-600 !to-red-700 !text-white !font-bold !shadow-lg !backdrop-blur-sm animate-pulse"
            />
          )}
        </div>

        {/* Card Content */}
        <CardContent className="flex-1 text-white p-2 space-y-2">
          <Typography className="font-bold text-lg text-white line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
            {it.name}
          </Typography>

          <div className="flex items-center gap-3">
            <Typography
              className={`text-xl font-extrabold ${
                hasDiscount
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
              }`}
            >
              {hasDiscount
                ? formatCurrency(discounted)
                : formatCurrency(
                    sellers.find(
                      (seller: SellerResponse) => seller.product_id === it.id
                    )?.price_original ?? 0
                  )}
            </Typography>
            {hasDiscount && (
              <Typography className="text-zinc-500 text-sm line-through">
                {formatCurrency(
                  sellers.find(
                    (seller: SellerResponse) => seller.product_id === it.id
                  )?.price_original ?? 0
                )}
              </Typography>
            )}
          </div>
        </CardContent>

        {/* Card Actions */}
        <CardActions className="px-2 pb-5 flex flex-col gap-3">
          <Button
            fullWidth
            variant="contained"
            className="!rounded-xl !py-3 !bg-gradient-to-r !from-fuchsia-600 !via-purple-600 !to-cyan-500 hover:!from-fuchsia-500 hover:!via-purple-500 hover:!to-cyan-400 !shadow-lg !shadow-purple-500/50 hover:!shadow-xl hover:!shadow-purple-500/70 !transition-all !duration-300 hover:!scale-105 active:!scale-95 !font-bold !text-base"
            startIcon={<FaShoppingCart className="text-lg" />}
            onClick={() => {
              handleAddToCart(it.id);
            }}
          >
            Thêm vào giỏ
          </Button>

          <Button
            fullWidth
            variant="outlined"
            className="!rounded-xl !py-3 !border-2 !border-cyan-500/50 !text-cyan-400 hover:!bg-cyan-500/10 hover:!border-cyan-400 !shadow-md hover:!shadow-lg hover:!shadow-cyan-500/30 !transition-all !duration-300 hover:!scale-105 active:!scale-95 !font-semibold !text-base"
            startIcon={<FaHeart className="text-lg" />}
            onClick={() => {
              navigate(`/production-detail/${it.id}`);
            }}
          >
            Mua Ngay
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CardItems;
