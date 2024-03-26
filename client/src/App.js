import { React } from "react";
import SignInOutTabs from "./components/signInOut";
import SignUp from "./components/signUp";
import Login from "./components/login";
import "./App.css";

function App() {
  return(
    <div className="App">
      <SignInOutTabs/>
      {/* <Login/>
      <SignUp/> */}
    </div>
  )
}

export default App;
