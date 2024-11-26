import React from "react";
import Doctors from "./../Pages/Doctors";
import { assets } from "../assets/assets";

export const MainBanner = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row mt-10  flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white md:leading-tight lg:leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img className="w-24" src={assets.group_profiles} alt="" />
            <p>
              Simply browse through our extensive list of trusted doctors,
              <br className="hidden sm:block" /> schedule your appointment
              hassle-free.
            </p>
          </div>
          <div className="mt-5">
            <a
              href="#speciality"
              className="flex items-center gap-2  bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
            >
              <p>Book appointment</p>
              <img className="w-3" src={assets.arrow_icon} alt="" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2  relative">
          <img
            className="md:absolute bottom-0 h-auto rounded-lg"
            src={assets.header_img}
            alt=""
          />
        </div>
      </div>
    </>
  );
};
