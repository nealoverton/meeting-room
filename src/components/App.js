import "../styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { userContext } from "../context";
import { useState } from "react";
import LoginWrapper from "./LoginWrapper";

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
