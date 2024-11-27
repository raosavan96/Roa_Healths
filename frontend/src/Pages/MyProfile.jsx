import React, { useState } from "react";
import { assets } from "./../assets/assets";

function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "Sawan Kumar Yadav",
    image: assets.profile_pic,
    email: "sawan32@gmail.com",
    phone: "+91 9637447793",
    address: {
      line1: "Vill - Bhojyara Chaksu",
      line2: "Jaipur Raj (303903)"
    },
    gender: "Male",
    dob: "02-09-2000"
  });

  return (
    <>
      <div>
        <div className="max-w-lg sm:mt-0 mt-5 flex flex-col gap-5 text-sm">
          <img className="sm:w-52  rounded" src={userData.image} alt=" " />
          <div>
            {isEdit ? (
              <input
                className="bg-gray-100 text-xl md:text-3xl font-medium max-w-56 md:max-w-80 mt-4 mb-3"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
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
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value
                      }))
                    }
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
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev.address,
                          line1: e.target.value
                        }))
                      }
                      type="text"
                    />
                    <br />
                    <input
                      className="bg-gray-100 max-w-52"
                      value={userData.address.line2}
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev.address,
                          line2: e.target.value
                        }))
                      }
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
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value
                      }))
                    }
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
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
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
  );
}

export default MyProfile;
