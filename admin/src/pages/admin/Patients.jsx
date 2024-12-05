import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const Patients = () => {
  const { getPatients, backendUrl, atoken } = useContext(AdminContext);
  const [active, setActive] = useState(true);

  const patientAction = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/action-patient",
        { id: id, active },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="m-5 max-h-[90vh] overflow-y-scroll w-full">
        <h1 className="text-lg font-medium">Patients</h1>
        <div className="w-full bg-white p-3 rounded-lg mt-3">
          <table class="table-auto w-full">
            <thead>
              <tr className="text-slate-600 border-b text-xs border-slate-200">
                <th className="text-start  font-normal  py-2 ">#</th>
                <th className="text-start font-normal py-2">Patient</th>
                <th className="text-start font-normal py-2">Id</th>
                <th className="text-start  font-normal py-2">Email</th>
                <th className="text-start  font-normal py-2">Gender</th>
                <th className="text-start  font-normal py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {getPatients.map((value, index) => (
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
                      src={value.image}
                      alt=""
                    />
                    <p className="text-xs text-slate-500">{value.name}</p>
                  </td>

                  <td className=" py-3">
                    <p className="text-xs text-slate-500">{value._id}</p>
                  </td>
                  <td className=" py-3">
                    <p className="text-xs text-slate-500">{value.email}</p>
                  </td>
                  <td className=" py-3">
                    <p className="text-xs text-slate-500">{value.gender}</p>
                  </td>
                  <td className=" py-3">
                    <div className="flex items-center gap-1">
                      <input
                        checked={value.status}
                        type="checkbox"
                        onChange={() => {
                          patientAction(value._id);
                          setActive((el) => !el);
                        }}
                      />
                      {value.status === true ? (
                        <p className="text-xs text-slate-500">Active</p>
                      ) : (
                        <p className="text-xs text-slate-500">Suspend</p>
                      )}
                    </div>
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

export default Patients;
