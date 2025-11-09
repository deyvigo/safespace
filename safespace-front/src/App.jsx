import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Inicio from "./pages/Inicio";
/* import Login from "./pages/Login";*/
import Biblioteca from "./pages/Biblioteca";
/* import AtencionPsicologica from "./pages/AtencionPsicologica";  */

import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="mt-20"></div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/*         <Route path="/login" element={<Login />} />
        <Route path="/atencion" element={<AtencionPsicologica />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </Router>
  );
}

export default App;
