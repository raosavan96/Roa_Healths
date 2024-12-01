import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoctor, setRelDoctor] = useState([]);
  const navig = useNavigate();

  const fetchRelatedDoc = async () => {
    const relDoc = await doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== docId
    );
    setRelDoctor(relDoc);
  };

  useEffect(() => {
    fetchRelatedDoc();
  }, [speciality, docId, doctors]);


  return (
    <>
      <div className="mt-10">
        <h3>Related Doctors</h3>
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {relDoctor.slice(0, 5).map((value, index) => (
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
      </div>
    </>
  );
};
