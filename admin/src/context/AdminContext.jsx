import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    const { data } = await axios.post(
      backendUrl + "/api/admin/all-doctors-admin",
      {},
      { headers: { atoken } }
    );
    if (data.success) {
      setDoctors(data.data);
    } else {
      toast.error(data.message);
    }
  };

  const availabilityChanged = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/availability-changed",
        { docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    atoken,
    setAtoken,
    backendUrl,
    doctors,
    getAllDoctors,
    availabilityChanged
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
