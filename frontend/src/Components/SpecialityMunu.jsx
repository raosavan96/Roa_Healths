import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

export const SpecialityMunu = () => {
  return (
    <>
      <div
        id="speciality"
        className="flex flex-col items-center pt-16 pb-10 text-gray-800"
      >
        <h1 className="text-xl md:text-3xl font-mono">Find by Speciality</h1>
        <p className="sm:w-1/3 text-center text-xs md:text-sm mt-3">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
        <div className="flex sm:justify-center mt-5 pt-5 overflow-scroll gap-4">
          {specialityData.map((value, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              key={index}
              to={`/doctors/${value.speciality}`}
            >
              <img className="w-16 sm:w-24 mb-2" src={value.image} alt="" />
              <p>{value.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
