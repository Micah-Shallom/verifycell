import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/homePage";
import SignUp from "../components/signUp";
import SignIn from "../components/signIn";
import Dashboard from "../components/dashboard";
import PrivateRoute from "../components/privateRoute";   

// Define routes using createBrowserRouter
const Router = createBrowserRouter([
    {
        path: "/",  // Route for the home page
        element: <HomePage />,  // Component to render
    },
    {
        path: "/dashboard/:username",  // Route for the dashboard with username parameter
        element: <PrivateRoute component={Dashboard} />,  // Protected route using PrivateRoute component
    },
    {
        path: "/register",  // Route for the sign-up page
        element: <SignUp />,  // Component to render
    },
    {
        path: "/login",  // Route for the sign-in page
        element: <SignIn />,  // Component to render
    }
]);

export default Router;
