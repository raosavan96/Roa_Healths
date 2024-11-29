import React, { useContext } from "react";
import { assets } from "./../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const navig = useNavigate();

  const logOut = () => {
    navig("/");
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
  };
  return (
    <>
      <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
        <div className="flex items-center gap-5 text-sm">
          <img className="w-16 cursor-pointer" src={assets.admin_logo} alt="" />
          <p className="border px-2 rounded-full py-0.5  text-gray-700">
            {atoken ? "Admin" : "Doctor"}
          </p>
        </div>
        <button
          onClick={logOut}
          className="bg-primary text-white px-8 py-2 rounded-full text-sm"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
