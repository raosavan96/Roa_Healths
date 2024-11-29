import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const TopDoctors = () => {
  const navig = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <>
      <div
        id="speciality"
        className="flex flex-col items-center pt-16 pb-10 text-gray-800"
      >
        <h1 className="text-xl md:text-3xl font-mono">Top Doctors to Book</h1>
        <p className="sm:w-1/3 text-center text-xs md:text-sm mt-3">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="w-full grid grid-cols-auto mt-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {doctors.slice(0, 10).map((value, index) => (
            <div
              onClick={() => {
                navig(`/appoinment/${value._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={value.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs md:text-sm text-center text-green-500">
                  {value.available === true && (
                    <>
                      <p className="w-2 h-2 rounded-full bg-green-500"></p>
                      <p>Available</p>
                    </>
                  )}
                  {value.available === false && (
                    <>
                      <p className="w-2 h-2 rounded-full bg-red-600"></p>
                      <p className="text-red-600">Unvailable</p>
                    </>
                  )}
                </div>
                <p className="text-gray-900 text-sm md:text-lg font-medium">
                  {value.name}
                </p>
                <p className="text-gray-600 text-xs md:text-sm">
                  {value.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              navig("/doctors");
              scrollTo(0, 0);
            }}
            className="bg-blue-100 text-gray-600 px-12 py-3 hover:scale-105 transition-all duration-500 rounded-full mt-10"
          >
            more
          </button>
        </div>
      </div>
    </>
  );
};
