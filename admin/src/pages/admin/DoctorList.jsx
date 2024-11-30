import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { getAllDoctors, doctors, atoken, availabilityChanged } =
    useContext(AdminContext);

  console.log(doctors);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, []);

  return (
    <>
      <div className="m-5 max-h-[90vh] overflow-y-scroll w-full">
        <h1 className="text-lg font-medium">All Doctors</h1>

        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {doctors.map((value, index) => (
            <div
              className="border border-indigo-200 rounded-xl shadow max-w-56 overflow-hidden  group"
              key={index}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary cursor-pointer transition-all duration-300"
                src={value?.image}
                alt=""
              />
              <div className="p-4">
                <p className="text-neutral-700 text-lg font-medium">
                  {value.name}
                </p>
                <p className="text-zinc-500 text-sm">{value.speciality}</p>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    className="cursor-pointer"
                    onChange={() => availabilityChanged(value._id)}
                    type="checkbox"
                    checked={value.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
