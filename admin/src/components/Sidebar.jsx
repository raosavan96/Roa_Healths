import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { atoken, getAllDoctors } = useContext(AdminContext);
  return (
    <>
      <div className="min-h-screen bg-white border-t">
        {atoken && (
          <ul className="text-gray-600 bg-white border-r">
            <NavLink
              className={({ isActive }) =>
                `flex justify-start items-start gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive
                    ? "bg-slate-200 border-r-4 border-primary text-slate-700"
                    : ""
                }`
              }
              to={`/admin-dashboard`}
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex justify-start items-start gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive
                    ? "bg-slate-200 border-r-4 border-primary text-slate-700"
                    : ""
                }`
              }
              to={`/all-appointments`}
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex justify-start items-start gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive
                    ? "bg-slate-200 border-r-4 border-primary text-slate-700"
                    : ""
                }`
              }
              to={`/add-doctor`}
            >
              <img src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex justify-start items-start gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive
                    ? "bg-slate-200 border-r-4 border-primary text-slate-700"
                    : ""
                }`
              }
              to={`/doctor-list`}
              onClick={() => {
                getAllDoctors();
              }}
            >
              <img src={assets.people_icon} alt="" />
              <p>Doctor List</p>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
