import { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';


function BannerSlider() {
    const [index, setIndex] = useState(0);
    const items = useSelector((state: RootState) => state.product.products);
    const navigate = useNavigate();
    if (!items || items.length === 0) {
        return (
            <Box className="relative w-full overflow-hidden rounded-xl" sx={{ height: 360 }}>
                <Box className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <div className="text-gray-600">Đang tải banner...</div>
                </Box>
            </Box>
        );
    }

    const go = (delta: number) => {
        const next = (index + delta + items.length) % items.length;
        setIndex(next);
    };

    const active = items[index];

    if (!active) {
        return (
            <Box className="relative w-full overflow-hidden rounded-xl" sx={{ height: 360 }}>
                <Box className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <div className="text-gray-600">Không có dữ liệu banner</div>
                </Box>
            </Box>
        );
    }

    return (
        <Box className="relative w-full overflow-hidden rounded-xl" sx={{ height: 360 }}>
            <Box
                className="absolute inset-0 bg-cover bg-center cursor-pointer"
                
                sx={{ backgroundImage: `url(${active.banner_url || ''})` }}
            >
                <Box className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </Box>

            <Box className="relative z-10 h-full px-6 py-8 flex items-center">
                <div>
                    <div className="text-red-500 font-semibold uppercase tracking-wide">{active.name || 'Featured'}</div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 max-w-xl">{active.name}</h1>
                    <div className="flex items-center gap-3 mt-4">
                        <Button variant="contained" color="error" size="large" className="!rounded-full"
                            onClick={() => navigate(`/products/${active.id}`)}
                        >
                            {active.name || 'Buy now'}
                        </Button>
                    </div>
                </div>
            </Box>

            <IconButton onClick={() => go(-1)} className="!absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white">
                <FaChevronLeft />
            </IconButton>
            <IconButton onClick={() => go(1)} className="!absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white">
                <FaChevronRight />
            </IconButton>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {items.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </Box>
    );
}

export default BannerSlider; 