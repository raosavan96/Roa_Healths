import React, { useState } from "react";
import upload_areaa from "../Components/image/upload_area.png";
import uploadImage from "../../../admin/src/Helpers/uploadImg";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

function MyProfile() {
  const { backendUrl, usertoken, getUserProfile, userPro, setUserPro } =
    useContext(AppContext);
  const [imageUser, setImageUser] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const handleProfile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("name", userPro.name);
      formData.append("image", userPro.image);
      formData.append("phone", userPro.phone);
      formData.append("address", JSON.stringify(userPro.address));
      formData.append("gender", userPro.gender);
      formData.append("dob", userPro.dob);

      const { data } = await axios.post(
        backendUrl + "/api/user/user-update-profile",
        formData,
        {
          headers: { usertoken }
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setImageUser(false);
        getUserProfile();
        setUserPro({
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

  function handleInputs(e) {
    const { name, value } = e.target;

    if (name === "line1") {
      setUserPro((preve) => {
        return {
          ...preve,
          address: {
            ...preve.address,
            [name]: value
          }
        };
      });
    } else {
      setUserPro((preve) => {
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

    setUserPro((preve) => {
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
    userPro && (
      <>
        <div className="mt-5">
          <div className="max-w-lg sm:mt-0 mt-5 flex flex-col gap-5 text-sm">
            <div>
              {isEdit ? (
                <>
                  <label htmlFor="userImg" className=" cursor-pointer">
                    <div className="inline-block relative cursor-pointer">
                      <img
                        className="sm:h-52 bg-indigo-50 border opacity-50 border-1 shadow-md"
                        src={imageUser ? upload_areaa : userPro.image}
                        alt=""
                      />
                      <img
                        className="h-10 absolute bottom-20 right-20 bg-indigo-50 shadow-mdo"
                        src={imageUser ? "" : upload_areaa}
                        alt=""
                      />
                    </div>
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
                <img
                  className="sm:w-52 bg-indigo-50 shadow-lg hover:bg-primary rounded"
                  src={userPro.image}
                  alt=" "
                />
              )}
            </div>
            <div>
              {isEdit ? (
                <input
                  className="bg-gray-100 text-xl md:text-3xl font-medium max-w-56 md:max-w-80 mt-4 mb-3"
                  type="text"
                  value={userPro.name}
                  onChange={handleInputs}
                  name="name"
                />
              ) : (
                <p className="font-medium text-xl md:text-3xl text-neutral-800 mt-4">
                  {userPro.name}
                </p>
              )}

              <hr className="bg-zinc-400 h-[1px] border-none" />
              <div>
                <p className="text-neutral-500 underline mt-5 mb-3">
                  CONTEXT INFORMATION
                </p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-neutral-700">
                  <p className="font-medium">Email id:</p>
                  <p className="text-primary">{userPro.email}</p>
                  <p className="font-medium">Phone:</p>
                  {isEdit ? (
                    <input
                      className="bg-gray-100 max-w-52"
                      type="text"
                      value={userPro.phone}
                      onChange={handleInputs}
                      name="phone"
                    />
                  ) : (
                    <p className="text-primary">{userPro.phone} </p>
                  )}

                  <p className="font-medium">Address:</p>
                  {isEdit ? (
                    <p>
                      <input
                        className="bg-gray-100 max-w-52 px-2"
                        value={userPro?.address?.line1}
                        onChange={handleInputs}
                        type="text"
                        name="line1"
                      />
                    </p>
                  ) : (
                    <p className="text-gray-500">{userPro?.address?.line1}</p>
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
                      value={userPro.gender}
                      onChange={handleInputs}
                      name="gender"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <p className="text-gray-500">{userPro.gender}</p>
                  )}
                  <p className="font-medium">Birthday:</p>
                  {isEdit ? (
                    <input
                      className="bg-gray-100 max-w-28"
                      value={userPro.dob}
                      type="date"
                      onChange={handleInputs}
                      name="dob"
                    />
                  ) : (
                    <p className="text-gray-500">{userPro.dob}</p>
                  )}
                </div>

                <div className="mt-10">
                  {isEdit ? (
                    <button
                      className="bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary active:bg-primary active:text-white px-8 py-2 rounded-full"
                      onClick={handleProfile}
                    >
                      Save information
                    </button>
                  ) : (
                    <button
                      className="bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary active:bg-primary active:text-white px-8 py-2 rounded-full"
                      onClick={() => setIsEdit(true)}
                    >
                      Edit{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default MyProfile;
