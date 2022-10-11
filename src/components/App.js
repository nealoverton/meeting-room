import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "../context";
import { useState } from "react";
import LoginWrapper from "./LoginWrapper";
import "../styles/styles.js";

function App() {

  return (

    <ProfileProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<LoginWrapper/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
