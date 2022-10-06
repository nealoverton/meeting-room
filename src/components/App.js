import { BrowserRouter, Routes, Route } from "react-router-dom";
import { profileContext } from "../context";
import { useState } from "react";
import LoginWrapper from "./LoginWrapper";
import "../styles/styles.js";

function App() {
  const [profile, setProfile] = useState();

  return (

    <profileContext.Provider value={{profile, setProfile}}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<LoginWrapper/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </profileContext.Provider>
  );
}

export default App;
