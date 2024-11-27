import React, { useContext } from "react";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppoinment = () => {
  const navig = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <>
      <div>
        <div>
          <h3 className="pb-3 mt-12 text-2xl text-zinc-700 border-b">
            My Appointment
          </h3>
          <div className="sm:mt-0 mt-5">
            {doctors.slice(0, 4).map((value, index) => (
              <div
                className="grid sm:grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                key={index}
              >
                <div
                  onClick={() => {
                    navig(`/appoinment/${value._id}`);
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer"
                >
                  <img
                    className="sm:w-32 mx-auto rounded shadow-md bg-primary"
                    src={value?.image}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p
                    onClick={() => {
                      navig(`/appoinment/${value._id}`);
                      scrollTo(0, 0);
                    }}
                    className="text-neutral-800 font-semibold cursor-pointer"
                  >
                    {value?.name}
                  </p>
                  <p>{value?.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address:</p>
                  <p className="text-xs">{value?.address.line1}</p>
                  <p className="text-xs">{value?.address.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:
                    </span>{" "}
                    25 July, 2024 | 8:30 PM
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300">
                    Pay Online
                  </button>
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300">
                    {" "}
                    Cencel appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAppoinment;
