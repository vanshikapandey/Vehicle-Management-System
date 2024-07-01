import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import Login from "./components/Login";
import Home from "./components/Home";
import NewEntry from "./components/NewEntry";
import { userInputs } from "./formSource";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("userAuth")) || false
  );

  const setAuth = (value) => {
    setIsAuthenticated(value);
  };

  useEffect(() => {
    localStorage.setItem("userAuth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route
              path="/newEntry"
              element={<NewEntry inputs={userInputs} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
