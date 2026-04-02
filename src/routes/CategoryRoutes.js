import Categories from "../pages/categories/Categories";

function CategoryRoutes (){
    return [
        {
            path: "/categories",
            element: <Categories />
        }
    ];
}

export default CategoryRoutes