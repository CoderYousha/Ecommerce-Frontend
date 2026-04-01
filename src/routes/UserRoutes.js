import Employees from "../pages/users/Employees";

function UserRoutes (){
    return [
        {
            path: "/employees",
            element: <Employees />
        }
    ];
}

export default UserRoutes;