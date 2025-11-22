import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdThunk } from "../../../features/production/ProductThucks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
function ProductionDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const product = useSelector((state: RootState) => state.product.product);   
    useEffect(() => {
        dispatch(getProductByIdThunk(Number(id)));
    }, [id, dispatch]);
    return (
        <div className="mx-auto max-w-6xl px-4 py-6">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
        </div>
    );
}

export default ProductionDetail;