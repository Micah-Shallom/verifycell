import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/homePage";
import SignUp  from "./components/signUp";
import  SignIn  from "./components/signIn";
import Logout  from "./components/Logout";


const Router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>,
        },
        {
            path: "/register",
            element: <SignUp />,
        },
        {
            path: "/login",
            element: <SignIn />,
        },
        {
            path: "/logout",
            element: <Logout />,
        }
]);

export default Router;
