import { Route, Routes, type RouteObject } from "react-router-dom";
import MainAdmin from "../page/admin/MainAdmin";
import UsersTable from "../page/admin/users/UsersTable";
import ProductCateTable from "../page/admin/productcate/ProductCateTable";
import Production from "../page/admin/production/Production";
import PlatForm from "../page/admin/platform/Platform";
import Categories from "../page/admin/Categories/Categories";


const router = [
    {
        path: "/",
        element: <MainAdmin />,
    },
    {
        path: "/users",
        element: <UsersTable />,
    },
    {
        path: "/categories",
        element: <Categories />,
    },
    {
        path: "/product-cate",
        element: <ProductCateTable />,
    },
    {
        path: "/products",
        element: <Production />,
    },
    {
        path: "/platforms",
        element: <PlatForm />,
    },
]

function renderRoutes(routeArray: RouteObject[]) {
    return routeArray.map((route: RouteObject, index: number) => (
        <Route key={index} path={route.path} element={route.element}>
            {route.children && renderRoutes(route.children)}
        </Route>
    ));
}

function AdminRouters() {
    return (
        <div>
            <Routes>
                {renderRoutes(router)}
            </Routes>
            
        </div>
    );
}

export default AdminRouters;