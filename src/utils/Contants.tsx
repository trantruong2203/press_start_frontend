import { FaUser, FaBoxOpen, FaShoppingCart, FaTags } from "react-icons/fa";

export const listMenu = [
    {
        id: 1,
        title: "Users Management",
        icon: <FaUser />,
        items: [
            {
                id: 1,
                title: "Users",
                path: "/users"
            },
            {
                id: 2,
                title: "Sellers",
                path: "/sellers"
            }
        ]
    },
    {
        id: 2,
        title: "Products Management",
        icon: <FaBoxOpen />,
        items: [
            {
                id: 1,
                title: "Products",
                path: "/products"
            },
            {
                id: 2,
                title: "Categories",
                path: "/categories"
            },
            {
                id: 3,
                title: "Platforms",
                path: "/platforms"
            },
        ]
    },
    {
        id: 3,
        title: "Orders Management",
        icon: <FaShoppingCart />,
        items: [
            {
                id: 1,
                title: "Orders",
                path: "/orders"
            },
            {
                id: 2,
                title: "Cart",
                path: "/carts"
            },
            {
                id: 3,
                title: "Wishlist",
                path: "/wishlist"
            },
            {
                id: 4,
                title: "Payments",
                path: "/payments"
            }
        ]
    },
    {
        id: 4,
        title: "Content Management",
        icon: <FaTags />,
        items: [
            {
                id: 1,
                title: "Comments",
                path: "/comments"
            },
            {
                id: 2,
                title: "Posts",
                path: "/posts"
            }
        ]
    }

];
