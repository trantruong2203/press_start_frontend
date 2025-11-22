import { Route, Routes, type RouteObject } from "react-router-dom";
import Main from "../page/client/Main";
import ProductsDetail from "../page/client/ProductsDetail";
import Seller from "../page/client/seller/Seller";
import PaymentSuccess from "../page/client/PaymentSuccess";
import PaymentCancel from "../page/client/PaymentCancel";
import ProductionDetail from "../page/client/production/ProductionDetail";

const router = [
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/payment-success',
        element: <PaymentSuccess />,
    },
    {
        path: '/payment-cancel',
        element: <PaymentCancel />,
    },
    {
        path: '/products/:id',
        element: <ProductsDetail />,
    },
    {
        path: '/seller',
        element: <Seller />,
    },
    {
        path: '*',
        element: null,
    },
    {
        path: '/production-detail/:id',
        element: <ProductionDetail />,
    }
]
function renderRoutes(routeArray: RouteObject[]) {
    return routeArray.map((route: RouteObject, index: number) => (
        <Route key={index} path={route.path} element={route.element}>
            {route.children && renderRoutes(route.children)}
        </Route>
    ));
}

function ClienRouters() {
    return (
        <div>
            <Routes>
                {renderRoutes(router)}
            </Routes>
            
        </div>
    );
}

export default ClienRouters;