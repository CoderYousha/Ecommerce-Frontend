import Clients from "../pages/users/Clients";
import Employees from "../pages/users/Employees";

function UserRoutes (){
    return [
        {
            path: "/employees",
            element: <Employees />
        },
        {
            path: "/clients",
            element: <Clients />
        },
    ];
}

export default UserRoutes;