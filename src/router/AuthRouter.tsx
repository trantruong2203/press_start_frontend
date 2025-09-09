import { Route, Routes, type RouteObject } from "react-router-dom";
import Signup from "../page/auth/Signup";
import Login from "../page/auth/Login";

const router = [
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: null,
    },
]
function renderRoutes(routeArray: RouteObject[]) {
    return routeArray.map((route: RouteObject, index: number) => (
        <Route key={index} path={route.path} element={route.element}>
            {route.children && renderRoutes(route.children)}
        </Route>
    ));
}

function AuthRouters() {
    return (
        <div>
            <Routes>
                {renderRoutes(router)}
            </Routes>
            
        </div>
    );
}

export default AuthRouters;