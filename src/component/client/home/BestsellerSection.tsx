import { Button, Card, CardActions, CardContent, CardMedia, Chip, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { ProductResponse } from '../../../interface/ProductResponse';
import { FaShoppingCart, FaHeart, FaPlay } from 'react-icons/fa';


function BestsellerSection() {
    const items = useSelector((state: RootState) => state.product.products);
    
    const formatCurrency = (value: number | string) => {
        const numberValue = typeof value === 'string' ? Number(value) : value;
        if (Number.isNaN(numberValue)) return String(value);
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue);
    };



    const getDiscountedPrice = (product: ProductResponse): number => {
        const d = Math.max(0, Math.min(100, product.discount || 0));
        return Math.round(product.price_original * (1 - d / 100));
    };

    return (
        <section className="mt-8">
            <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-wide">BESTSELLER</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((it: ProductResponse) => {
                    const hasDiscount = (it.discount ?? 0) > 0;
                    const discounted = getDiscountedPrice(it);
                    return (
                        <div key={it.id} className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_-6px_rgba(34,211,238,0.8)] transition-shadow">
                            <Card className="bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden">
                                <div className="relative">
                                    <CardMedia
                                        component="div"
                                        className="h-48 bg-zinc-800 bg-cover bg-center"
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
                                        label={`Stock: ${it.stock}`}
                                        color={it.stock > 0 ? 'success' : 'warning'}
                                        size="small"
                                        className="!absolute !left-3 !top-3 !bg-emerald-500/90 !text-white"
                                    />
                                    {hasDiscount && (
                                        <Chip
                                            label={`-${it.discount}%`}
                                            color="error"
                                            size="small"
                                            className="!absolute !right-3 !top-3 !bg-rose-600 !text-white"
                                        />
                                    )}
                                </div>

                                <CardContent className="text-white">
                                    <Typography className="font-semibold text-emerald-950 line-clamp-1">
                                        {it.name}
                                    </Typography>
                                    <div className="mt-1 flex items-end gap-3">
                                        <Typography className={`text-sm ${hasDiscount ? 'text-emerald-300 font-bold' : 'text-cyan-300'}`}>
                                            {hasDiscount ? formatCurrency(discounted) : formatCurrency(it.price_original)}
                                        </Typography>
                                        {hasDiscount && (
                                            <Typography className="text-zinc-400 text-xs line-through">
                                                {formatCurrency(it.price_original)}
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
                                    >
                                        Thêm vào giỏ
                                    </Button>
                                    <div className="text-xs text-zinc-400">
                                        {it.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                                    </div>
                                </CardActions>
                            </Card>
                            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 opacity-0 blur-lg transition-opacity group-hover:opacity-30" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default BestsellerSection; 