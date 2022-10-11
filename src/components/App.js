import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "../context";
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
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>

            <Route path='/' element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }/>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
