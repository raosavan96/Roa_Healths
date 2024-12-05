import React, { useContext } from "react";
import Login from "./pages/login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointment from "./pages/admin/AllAppointment";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import Patients from "./pages/admin/Patients";

function App() {
  const { atoken } = useContext(AdminContext);
  return atoken ? (
    <>
      <div>
        <div>
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointment />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorList />} />
              <Route path="/patients-list" element={<Patients />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div>
        <Login />
      </div>
    </>
  );
}

export default App;
