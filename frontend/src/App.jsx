import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import About from "./Pages/About";
import Login from "./Pages/Login";
import { Contect } from "./Pages/Contect";
import MyProfile from "./Pages/MyProfile";
import MyAppoinment from "./Pages/MyAppoinment";
import { Appoinment } from "./Pages/Appoinment";
import Navbar from "./Components/Navbar";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%] overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contect" element={<Contect />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appoinment" element={<MyAppoinment />} />
        <Route path="/appoinment/:docId" element={<Appoinment />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
