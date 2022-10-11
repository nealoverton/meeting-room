import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ProfileProvider } from "../context";
import { auth } from "../firebase";
import LoginWrapper from "./LoginWrapper";
import "../styles/styles.js";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

function App() {

  return (
    <ProfileProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>

            <Route path='/' element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }/>
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
