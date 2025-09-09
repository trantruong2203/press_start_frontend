import { Route, Routes, type RouteObject } from "react-router-dom";
import Main from "../page/client/Main";
import ProductsDetail from "../page/client/ProductsDetail";
import Seller from "../page/client/seller/Seller";

const router = [
    {
        path: '/',
        element: <Main />,
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