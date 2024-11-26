import React, { useState } from "react";
import { assets } from "./../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navig = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between py-1 border-b border-b-gray-400">
      <NavLink to={"/"}>
        <img className="w-16 h-16 cursor-pointer" src={assets.logo} alt="" />
      </NavLink>
      <ul className="hidden md:flex gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-2 ">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-2 ">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-2 ">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contect"}>
          <li className="py-2 ">Contect</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex cursor-pointer group relative">
            <img className="h-12 w-12 rounded-full" src={assets.logo} alt="" />
            <img className="w-[10px]" src={assets.dropdown_icon} alt=" " />
            <div className="hidden group-hover:block absolute  top-0 right-0 pt-16 font-medium text-gray-600 z-20 ">
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                <p
                  onClick={() => navig("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navig("/my-appoinment")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appoinment
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navig("/login")}
            className="bg-primary text-white px-8 py-2 rounded-full font-medium hidden md:block"
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
