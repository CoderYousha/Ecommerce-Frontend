import OrderItems from "../pages/orders/OrderItems";
import Orders from "../pages/orders/Orders";


function OrderRoutes (){
    return [
        {
            path: "/orders",
            element: <Orders />
        },
        {
            path: "/orders/:id",
            element: <OrderItems />
        },
    ];
}

export default OrderRoutes;