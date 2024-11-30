import React, { useState } from "react";
import { assets } from "./../assets/assets";
import upload_areaa from "../Components/image/upload_area.png";
import uploadImage from "../../../admin/src/Helpers/uploadImg";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

function MyProfile() {
  const { backendUrl, usertoken } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: ""
    },
    gender: "",
    dob: ""
  });


  // const getUserProfile = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       backendUrl + "/api/user/get-profile",

  //       {
  //         headers: { usertoken }
  //       }
  //     );

  //     if (data.success) {
  //       setUserData(data.userInfo);
  //       console.log("data",data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleProfile = async (e) => {
    e.preventDefault();

    // try {
    //   const formData = new FormData();
    //   formData.append("name", userData.name);
    //   formData.append("image", userData.image);
    //   formData.append("phone", userData.phone);
    //   formData.append("address", JSON.stringify(userData.address));
    //   formData.append("gender", userData.gender);
    //   formData.append("dob", userData.dob);

    //   const { data } = await axios.post(
    //     backendUrl + "/api/user/user-update-profile",
    //     formData,
    //     {
    //       headers: { usertoken }
    //     }
    //   );

    //   if (data.success) {
    //     toast.success(data.message);
    //     setUserData({
    //       name: "",
    //       image: "",
    //       email: "",
    //       phone: "",
    //       address: {
    //         line1: "",
    //         line2: ""
    //       },
    //       gender: "",
    //       dob: ""
    //     });
    //   } else {
    //     toast.error(data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (error) {
    //     console.log(error);
    //   }
    // }
  };

  function handleInputs(e) {
    const { name, value } = e.target;

    if (name === "line1" || name === "line2") {
      setUserData((preve) => {
        return {
          ...preve,
          address: {
            ...preve.address,
            [name]: value
          }
        };
      });
    } else {
      setUserData((preve) => {
        return {
          ...preve,
          [name]: value
        };
      });
    }
  }

  async function handleUserImg(e) {
    const imageUser = e.target.files[0];

    const imagU = await uploadImage(imageUser);

    const { secure_url } = imagU;

    setUserData((preve) => {
      return {
        ...preve,
        image: secure_url
      };
    });
  }

  useEffect(() => {
    if (usertoken) {
      getUserProfile();
    }
  }, []);

  return (
    <>
      <div className="mt-5">
        <form
          onSubmit={handleProfile}
          className="max-w-lg sm:mt-0 mt-5 flex flex-col gap-5 text-sm"
        >
          <div>
            {isEdit ? (
              <>
                <label htmlFor="userImg" className=" cursor-pointer">
                  <img
                    className="sm:h-52 bg-indigo-50 shadow-md border"
                    src={userData?.image ? userData?.image : upload_areaa}
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  onChange={handleUserImg}
                  name="image"
                  id="userImg"
                  hidden
                />
              </>
            ) : (
              <img className="sm:w-52  rounded" src={userData.image} alt=" " />
            )}
          </div>
          <div>
            {isEdit ? (
              <input
                className="bg-gray-100 text-xl md:text-3xl font-medium max-w-56 md:max-w-80 mt-4 mb-3"
                type="text"
                value={userData.name}
                onChange={handleInputs}
                name="name"
              />
            ) : (
              <p className="font-medium text-xl md:text-3xl text-neutral-800 mt-4">
                {userData.name}
              </p>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />
            <div>
              <p className="text-neutral-500 underline mt-5 mb-3">
                CONTEXT INFORMATION
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-neutral-700">
                <p className="font-medium">Email id:</p>
                <p className="text-primary">{userData.email}</p>
                <p className="font-medium">Phone:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 max-w-52"
                    type="text"
                    value={userData.phone}
                    onChange={handleInputs}
                    name="phone"
                  />
                ) : (
                  <p className="text-primary">{userData.phone} </p>
                )}

                <p className="font-medium">Address:</p>
                {isEdit ? (
                  <p>
                    <input
                      className="bg-gray-100 max-w-52"
                      value={userData.address.line1}
                      onChange={handleInputs}
                      type="text"
                      name="line1"
                    />
                    <br />
                    <input
                      className="bg-gray-100 max-w-52"
                      value={userData.address.line2}
                      type="text"
                      onChange={handleInputs}
                      name="line2"
                    />
                  </p>
                ) : (
                  <p className="text-gray-500">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="text-neutral-500 underline mt-5 mb-3">
                BESIC INFORMATION
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-neutral-700">
                <p className="font-medium">Gender:</p>
                {isEdit ? (
                  <select
                    className="max-w-20 bg-gray-100"
                    value={userData.gender}
                    onChange={handleInputs}
                    name="gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-500">{userData.gender}</p>
                )}
                <p className="font-medium">Birthday:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 max-w-28"
                    value={userData.dob}
                    type="date"
                    onChange={handleInputs}
                    name="dob"
                  />
                ) : (
                  <p className="text-gray-500">{userData.dob}</p>
                )}
              </div>

              <div className="mt-10">
                {isEdit ? (
                  <button
                    className="bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary active:bg-primary active:text-white px-8 py-2 rounded-full"
                    onClick={() => setIsEdit(false)}
                  >
                    Save information
                  </button>
                ) : (
                  <button
                    type="text"
                    className="bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary active:bg-primary active:text-white px-8 py-2 rounded-full"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default MyProfile;
