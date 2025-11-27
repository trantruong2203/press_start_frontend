import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdThunk } from "../../../features/production/ProductThucks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import MediaCarousel from "../../../component/client/MediaCarousel";

function ProductionDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const product = useSelector((state: RootState) => state.product.product);   
    
    useEffect(() => {
        dispatch(getProductByIdThunk(Number(id)));
    }, [id, dispatch]);

    if (!product) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                    <div className="h-96 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-6">
            <h1 className="text-3xl font-bold mb-6 text-white">{product.name}</h1>
            
            {/* Media Carousel */}
            {product.trailer_url && (
                <MediaCarousel 
                    trailerUrl={product.trailer_url} 
                    images={product.listImg || []} 
                />
            )}

            {/* Product Description */}
            <div className="mt-8 bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">About This Game</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                </p>
            </div>

            {/* Categories */}
            {product.listCate && product.listCate.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.listCate.map((category) => (
                            <span
                                key={category.id}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors duration-200"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductionDetail;