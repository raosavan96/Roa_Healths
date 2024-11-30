import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [usertoken, setUserToken] = useState(
    localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : ""
  );

  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    usertoken,
    setUserToken
  };

  useEffect(() => {
    getDoctorData();
  }, [doctors]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
