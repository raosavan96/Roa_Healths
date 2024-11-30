import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [userPro, setUserPro] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [usertoken, setUserToken] = useState(
    localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : ""
  );

  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { usertoken }
      });

      if (data.success) {
        setUserPro(data.userInfo);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (usertoken) {
      getUserProfile();
    } else {
      setUserPro(false);
    }
  }, [usertoken]);

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
    setUserToken,
    getUserProfile,
    userPro,
    setUserPro
  };

  useEffect(() => {
    getDoctorData();
  }, [doctors]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
