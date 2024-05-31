import { React } from "react";
import "./App.css";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import { Outlet } from "react-router-dom";

function App() {
  return(
    <>
      <div className="App">
        <Outlet/>
        {/* <SignUp/>
        <SignIn/> */}
      </div>
    </>
  )
}

export default App;
