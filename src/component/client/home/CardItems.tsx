
import { Card, CardMedia, CardContent, CardActions, Button, Chip, Tooltip, Typography } from "@mui/material";
import { FaPlay, FaHeart, FaShoppingCart } from "react-icons/fa";
import type { SellerResponse } from "../../../interface/SellerResponse";
import type { ProductResponse } from "../../../interface/ProductResponse";
function CardItems({ it, sellers, hasDiscount, discounted, formatCurrency, handleAddToCart }: { it: ProductResponse; sellers: SellerResponse[]; hasDiscount: boolean; discounted: number; formatCurrency: (value: number | string) => string; handleAddToCart: (productId: number) => void }) {
  return (
    <div>
      <Card className="bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden group">
        <div className="relative">
          <CardMedia
            component="div"
            className="h-48 bg-zinc-800 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${it.banner_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <Tooltip title="Xem trailer">
              <button className="h-10 w-10 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-white grid place-items-center shadow-lg">
                <FaPlay size={14} />
              </button>
            </Tooltip>
            <Tooltip title="Yêu thích">
              <button className="h-10 w-10 rounded-full bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white grid place-items-center shadow-lg">
                <FaHeart size={14} />
              </button>
            </Tooltip>
          </div>
          <Chip
            label={`Stock: ${
              sellers.find(
                (seller: SellerResponse) => seller.product_id === it.id
              )?.stock ?? 0
            }`}
            color={
              sellers.find(
                (seller: SellerResponse) => seller.product_id === it.id
              )?.stock ?? 0 > 0
                ? "success"
                : "warning"
            }
            size="small"
            className="!absolute !left-3 !top-3 !bg-emerald-500/90 !text-white"
          />
          {hasDiscount && (
            <Chip
              label={`-${
                sellers.find(
                  (seller: SellerResponse) => seller.product_id === it.id
                )?.discount ?? 0
              }%`}
              color="error"
              size="small"
              className="!absolute !right-3 !top-3 !bg-rose-600 !text-white"
            />
          )}
        </div>

        <CardContent className="text-white">
          <Typography className="font-semibold text-white line-clamp-1">
            {it.name}
          </Typography>
          <div className="mt-1 flex items-end gap-3">
            <Typography
              className={`text-sm ${
                hasDiscount ? "text-emerald-300 font-bold" : "text-cyan-300"
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
              <Typography className="text-zinc-400 text-xs line-through">
                {formatCurrency(
                  sellers.find(
                    (seller: SellerResponse) => seller.product_id === it.id
                  )?.price_original ?? 0
                )}
              </Typography>
            )}
          </div>
        </CardContent>

        <CardActions className="px-4 pb-4 flex items-center justify-between">
          <Button
            variant="contained"
            color="primary"
            className="!rounded-full !bg-gradient-to-r !from-fuchsia-600 !to-cyan-500 hover:!brightness-110"
            startIcon={<FaShoppingCart />}
            onClick={() => {
              handleAddToCart(it.id);
            }}
          >
            Thêm vào giỏ
          </Button>
          <div className="text-xs text-zinc-400">
            {sellers.find(
              (seller: SellerResponse) => seller.product_id === it.id
            )?.stock ?? 0 > 0
              ? "Còn hàng"
              : "Hết hàng"}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default CardItems;
