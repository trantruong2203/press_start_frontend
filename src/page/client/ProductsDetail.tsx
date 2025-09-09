import { useParams } from "react-router-dom";

function ProductsDetail() {
    const { id } = useParams();
    return (
        <div>
            <h1>ProductsDetail</h1>
            <h1>{id}</h1>
        </div>
    );
}

export default ProductsDetail;