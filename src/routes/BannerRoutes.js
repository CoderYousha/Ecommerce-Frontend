import Banners from "../pages/banners/Banners";

function BannerRoutes() {
    return [
        {
            path: "/banners",
            element: <Banners />
        }
    ];
}

export default BannerRoutes;