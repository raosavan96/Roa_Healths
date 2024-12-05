import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AllAppointment = () => {
  const { backendUrl, atoken, userAppointments } = useContext(AdminContext);

  const deleteAppointMent = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/admin/delete-apointment`,
        {
          id: id
        },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="m-5 max-h-[90vh] overflow-y-scroll w-full">
        <h1 className="text-lg font-medium">All Doctors</h1>
        <div className="w-full bg-white p-3 rounded-lg mt-3">
          <table class="table-auto w-full">
            <thead>
              <tr className="text-slate-600 border-b text-xs border-slate-200">
                <th className="text-start  font-normal  py-2 ">#</th>
                <th className="text-start font-normal py-2">Patient</th>
                <th className="text-start  font-normal py-2">Department</th>

                <th className="text-start font-normal py-2">Date & Time</th>
                <th className="text-start  font-normal py-2">Doctor</th>
                <th className="text-start  font-normal py-2">Fees</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments
                .filter((fe) => fe.cancelled !== true)
                .map((value, index) => (
                  <tr
                    key={index}
                    className="text-slate-600 border-b text-xs border-slate-200 px-3"
                  >
                    <td className="py-3">
                      <p className="text-xs text-slate-500">{index + 1}</p>
                    </td>
                    <td className=" flex items-center gap-2 py-3">
                      <img
                        className="w-8 bg-slate-100 h-8 rounded-full"
                        src={value.userData.image}
                        alt=""
                      />
                      <p className="text-xs text-slate-500">
                        {value.userData.name}
                      </p>
                    </td>
                    <td className=" py-3">
                      <p className="text-xs text-slate-500">
                        {" "}
                        {value.docData.speciality}
                      </p>
                    </td>

                    <td className=" py-3">
                      <p className="text-xs text-slate-500">
                        {value.slotDate}, {value.slotTime}
                      </p>
                    </td>
                    <td className=" py-3 flex items-center gap-2">
                      <img
                        className="w-8 bg-slate-100 h-8 rounded-full"
                        src={value.docData.image}
                        alt=""
                      />
                      <p className="text-xs text-slate-500">
                        {" "}
                        {value.docData.name}
                      </p>
                    </td>
                    <td className=" py-3">
                      <p className="text-xs text-slate-500">
                        ${value.docData.fees}
                      </p>
                    </td>
                    <td className=" py-3">
                      <button
                        onClick={() => {
                          deleteAppointMent(value._id);
                        }}
                        className="bg-red-100 w-7 text-[red] flex items-center justify-center shadow-xl border h-7 rounded-full"
                      >
                        <RxCross2 />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllAppointment;
