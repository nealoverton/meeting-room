import "../styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "../context";
import { useState } from "react";
import LoginWrapper from "./LoginWrapper";
import "../styles/styles.js";

function App() {
  const [user, setUser] = useState();

  return (

    <userContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<LoginWrapper/>}>

            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
