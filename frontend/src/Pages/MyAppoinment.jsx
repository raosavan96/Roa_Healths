import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppoinment = () => {
  const navig = useNavigate();
  const { backendUrl, usertoken,getDoctorData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  // const month = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Des"
  // ];

  const getAppointment = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/all-appointments",
        { headers: { usertoken } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/appointment-cancel",
        { appointId },
        { headers: { usertoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointment();
        getDoctorData()
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (usertoken) {
      getAppointment();
    }
  }, [appointments]);

  return (
    <>
      <div>
        <div>
          <h3 className="pb-3 mt-12 text-2xl text-zinc-700 border-b">
            My Appointment
          </h3>
          <div className="sm:mt-0 mt-5">
            {appointments.map((value, index) => (
              <div
                className="grid sm:grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                key={index}
              >
                <div
                  onClick={() => {
                    navig(`/appoinment/${value?.docData?._id}`);
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer"
                >
                  <img
                    className="sm:w-32 mx-auto rounded shadow-md bg-primary"
                    src={value?.docData?.image}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p
                    onClick={() => {
                      navig(`/appoinment/${value?.docData?._id}`);
                      scrollTo(0, 0);
                    }}
                    className="text-neutral-800 font-semibold cursor-pointer"
                  >
                    {value?.docData?.name}
                  </p>
                  <p>{value?.docData?.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address:</p>
                  <p className="text-xs">{value?.docData?.address.line1}</p>
                  <p className="text-xs">{value?.docData?.address.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:
                    </span>{" "}
                    {value?.slotDate} | {value?.slotTime}
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                  {!value.cancelled && (
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300">
                      Pay Online
                    </button>
                  )}

                  {!value.cancelled && (
                    <button
                      onClick={() => {
                        cancelAppointment(value?._id);
                      }}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cencel appointment
                    </button>
                  )}

                  {value.cancelled && (
                    <button className="sm:min-w-48 py-2 border border-red-500  text-red-500">
                      Appointment cancelled
                    </button>
                  )}
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
