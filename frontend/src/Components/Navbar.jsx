import React, { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function Navbar() {
  const navig = useNavigate();

  const { usertoken, setUserToken } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logoutUser = () => {
    setUserToken(false);
    localStorage.removeItem("usertoken");
    toast.success("Logout success..");
  };

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
        {usertoken ? (
          <div className="flex cursor-pointer group relative">
            <img
              className="h-10 w-10  md:h-12 md:w-12 rounded-full"
              src={assets.logo}
              alt=""
            />
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
                  onClick={logoutUser}
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

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        <div
          className={`md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all   ${
            showMenu ? "fixed w-full " : "h-0 w-0"
          }`}
        >
          <div className="flex items-center justify-between px-5  py-6">
            <img className="w-20" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          <ul className="flex flex-col items-center gap-4 mt-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to={`/`}>
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={`/doctors`}>
              <p className="px-4 py-2 rounded inline-block"> All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={`/about`}>
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={`/contect`}>
              <p className="px-4 py-2 rounded inline-block">Cotnect</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
