import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { RelatedDoctors } from "../Components/RelatedDoctors";

export const Appoinment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [scrolls, setScrolls] = useState(0);

  const [doctor, setDoctor] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fecthDocInfo = async () => {
    const doctorInfos = await doctors.find((doc) => doc._id === docId);
    setDoctor(doctorInfos);
  };

  const getAvailableSlots = () => {
    setDocSlot([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();

      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlote = [];

      while (currentDate < endTime) {
        let formettedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        timeSlote.push({
          datetime: new Date(currentDate),
          time: formettedTime
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlote]);
    }
  };

  function nextScl() {
    if (docSlot.length > scrolls) {
      setScrolls((prev) => prev + 1);
    }
  }

  function prevScl() {
    if (scrolls !== 0) {
      setScrolls((prev) => prev - 1);
    }
  }

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  useEffect(() => {
    getAvailableSlots();
  }, [doctor]);

  useEffect(() => {
    fecthDocInfo();
  }, [docId, doctors]);

  return (
    doctor && (
      <>
        <div className="mt-9">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <img
                className="bg-primary w-full mx-auto sm:max-w-72 rounded-lg"
                src={doctor?.image}
                alt=""
              />
            </div>
            <div className="flex-1 border border-gray-400 rounded-lg p-3 md:p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-40px] sm:mt-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xl md:text-2xl font-medium text-gray-900">
                  {doctor?.name}
                </h4>
                <img className="md:w-5 w-4" src={assets.verified_icon} alt="" />
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm mt-1 text-gray-600">
                <p>
                  {doctor?.degree} - {doctor?.speciality}{" "}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {doctor?.experience}
                </button>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About{" "}
                  <img className="w-3 md:w-4" src={assets.info_icon} alt="" />
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                  {doctor?.about}
                </p>
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fee:{" "}
                <span className="text-gray-700">
                  {currencySymbol}
                  {doctor?.fees}
                </span>
              </p>
            </div>
          </div>

          <div className="sm:ms-72 sm:ps-4 mt-9 font-medium text-gray-700">
            <p>Booking slots</p>

            <div className="flex gap-3 px-0 md:px-4 py-7 items-center w-full overflow-x-scroll ">
              {docSlot.length &&
                docSlot.map((value, index) => (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-4 md:py-6 min-w-13 md:min-w-16 px-2 md:hover:translate-y-[-7px] transition-all duration-500  rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-300 hover:bg-blue-50 hover:border-blue-200"
                    }`}
                  >
                    <p className="text-xs md:text-base">
                      {value[0] && weekDay[value[0].datetime.getDay()]}
                    </p>
                    <p className="text-xs md:text-base">
                      {" "}
                      {value[0] && value[0].datetime.getDate()}
                    </p>
                  </div>
                ))}
            </div>

            <div className="relative">
              <div className="w-full overflow-x-scroll mt-4 ">
                <div
                  className="flex items-center gap-3 w-full md:py-7 md:hover:translate-y-[-7px]  transition-all duration-1000"
                  style={{ transform: `translateX(-${scrolls * 28}%)` }}
                >
                  {docSlot.length &&
                    docSlot[slotIndex].map((value, index) => (
                      <p
                        onClick={() => setSlotTime(value.time)}
                        className={`md:text-sm text-xs font-light md:hover:translate-y-[-5px] transition-all duration-500 flex-shrink-0 px-3 py-1 md:px-5 md:py-2 rounded-full cursor-pointer ${
                          value.time === slotTime
                            ? "bg-primary text-white "
                            : "text-gray-400 border border-gray-300"
                        }`}
                        key={index}
                      >
                        {value.time.toLowerCase()}
                      </p>
                    ))}
                </div>
              </div>
              <div className="-top-10 absolute flex gap-2 right-0 ">
                <button
                  onClick={prevScl}
                  className="text-4xl text-primary font-bold hidden md:block hover:translate-y-[-3px] transition-all duration-500"
                >
                  <CiSquareChevLeft />
                </button>
                <button
                  onClick={nextScl}
                  className="text-4xl text-primary font-bold hidden md:block hover:translate-y-[-3px] transition-all duration-500"
                >
                  <CiSquareChevRight />
                </button>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start">
              <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
                Book an appointment
              </button>
            </div>
          </div>

          <div>
            <RelatedDoctors docId={docId} speciality={doctor?.speciality} />
          </div>
        </div>
      </>
    )
  );
};
