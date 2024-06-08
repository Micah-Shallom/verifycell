import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/homePage";
import SignUp  from "../components/signUp";
import  SignIn  from "../components/signIn";
import Dashboard from "../components/dashboard";
import PrivateRoute from "../components/privateRoute";   


const Router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>,
        },
        {
            path: "/dashboard",
            element: <PrivateRoute component={Dashboard} />,
        },
        {
            path: "/register",
            element: <SignUp />,
        },
        {
            path: "/login",
            element: <SignIn />,
        }
]);

export default Router;
