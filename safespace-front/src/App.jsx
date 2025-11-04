import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Inicio from "./pages/Inicio";
/* import Login from "./pages/Login";
import Biblioteca from "./pages/Biblioteca";
import AtencionPsicologica from "./pages/AtencionPsicologica"; */

import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          {/*         <Route path="/login" element={<Login />} />
        <Route path="/atencion" element={<AtencionPsicologica />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/*         <Route path="/biblioteca" element={<Biblioteca />} />
           */}{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
