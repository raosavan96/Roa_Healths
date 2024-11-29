import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Doctors() {
  const navig = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [filter, setFilter] = useState(false);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      const filterDoc = doctors.filter((doc) => doc.speciality === speciality);
      setFilterDoc(filterDoc);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  return (
    <>
      <div>
        <p className="text-gray-600 md:mt-0 mt-5">
          Browse through the doctors speciality
        </p>
        <div className="flex w-full flex-col sm:flex-row items-start gap-5 mt-5 ">
          <div>
            <button
              onClick={() => setFilter((prev) => !prev)}
              className="bg-primary sm:hidden text-white px-5 active:bg-white active:text-primary rounded py-1 border active:border-primary"
            >
              Filter
            </button>
          </div>

          <div
            className={`flex w-1/5  flex-col gap-4 text-sm text-gray-600 ${
              filter ? "flex" : "hidden sm:flex"
            }`}
          >
            <p
              onClick={() => {
                speciality === "General physician"
                  ? navig("/doctors")
                  : navig("/doctors/General physician");
                setFilter(false);
              }}
              className={`w-[90vw] sm:w-auto ps-1 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "General physician"
                  ? "bg-blue-100 text-black"
                  : ""
              }`}
            >
              General physician
            </p>
            <p
              onClick={() => {
                speciality === "Gynecologist"
                  ? navig("/doctors")
                  : navig("/doctors/Gynecologist");
                setFilter(false);
              }}
              className={`w-[90vw] sm:w-auto ps-1 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Gynecologist" ? "bg-blue-100 text-black" : ""
              }`}
            >
              Gynecologist
            </p>
            <p
              onClick={() => {
                speciality === "Dermatologist"
                  ? navig("/doctors")
                  : navig("/doctors/Dermatologist");
                setFilter(false);
              }}
              className={`w-[90vw] sm:w-auto ps-1 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Dermatologist" ? "bg-blue-100 text-black" : ""
              }`}
            >
              Dermatologist
            </p>
            <p
              onClick={() => {
                speciality === "Pediatricians"
                  ? navig("/doctors")
                  : navig("/doctors/Pediatricians");
                setFilter(false);
              }}
              className={`w-[90vw] sm:w-auto ps-1 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Pediatricians" ? "bg-blue-100 text-black" : ""
              }`}
            >
              Pediatricians
            </p>
            <p
              onClick={() => {
                speciality === "Neurologist"
                  ? navig("/doctors")
                  : navig("/doctors/Neurologist");
                setFilter(false);
              }}
              className={`w-[90vw] sm:w-auto ps-1 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Neurologist" ? "bg-blue-100 text-black" : ""
              }`}
            >
              Neurologist
            </p>
            {/* <p
              onClick={() =>
                speciality === "Gastroenterologist"
                  ? navig("/doctors")
                  : navig("/doctors/Gastroenterologist")
              }
              className={`w-[90vw] sm:w-auto ps-1 py-1.5 border border-gray-300 rounded transition-all cursor-pointer`}
            >
              Gastroenterologist 
            </p> */}
          </div>
          <div className="w-4/5 grid grid-cols-auto gap-4 gap-y-6 mx-auto ">
            {filterDoc.map((value, index) => (
              <div
                onClick={() => navig(`/appoinment/${value._id}`)}
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
        </div>
      </div>
    </>
  );
}

export default Doctors;
