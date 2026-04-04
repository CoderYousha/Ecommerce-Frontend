import Products from "../pages/products/Products";

function ProductRoutes (){
    return [
        {
            path: "/products",
            element: <Products />
        }
    ];
}

export default ProductRoutes;