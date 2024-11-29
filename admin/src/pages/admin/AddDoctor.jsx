import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
// import { axios } from 'axios';
import { toast } from "react-toastify";

const AddDoctor = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    specialty: "General physician",
    education: "",
    address: {
      line1: "",
      line2: ""
    },
    about: "",
    image: {}
  });

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    

    try{



    } catch(error){
      console.log(error)
    }
  };

  function onChangeInput(e) {
    const { name, value } = e.target;

    if (name === "line1" || name === "line2") {
      setDoctorInfo((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setDoctorInfo((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }

  function handleDocImg(e) {
    const docImg = e.target.files[0];
    // console.log(docImg);
    setDoctorInfo((prev) => {
      return {
        ...prev,
        image: docImg
      };
    });
  }

  useEffect(() => {
    handleAddDoctor();
  }, [doctorInfo]);

  return (
    <>
      <div className="p-3">
        <form onSubmit={handleAddDoctor} className="m-5 w-full">
          <h3 className="mb-3 text-lg font-medium">Add Doctor</h3>

          <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
            <div className="flex items-center  mb-8 gap-4 text-gray-500">
              <label htmlFor="doc-img" className="cursor-pointer">
                <img
                  className="w-20 bg-gray-100 rounded-full"
                  src={
                    doctorInfo?.image && doctorInfo?.image instanceof File
                      ? URL.createObjectURL(doctorInfo.image)
                      : assets.upload_area
                  }
                  alt=""
                />
              </label>
              <input
                onChange={handleDocImg}
                name="doc-img"
                type="file"
                id="doc-img"
                hidden
              />
              <p>
                Upload doctor <br /> picture
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-10 text-gray-600">
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Name</p>
                  <input
                    name="name"
                    value={doctorInfo.name}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                    type="text"
                    placeholder="Name"
                    // required
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Email</p>
                  <input
                    name="email"
                    value={doctorInfo.email}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Password</p>
                  <input
                    name="password"
                    value={doctorInfo.password}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Experience</p>
                  <select
                    name="experience"
                    value={doctorInfo.experience}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                  >
                    <option value={"1 Year"}>1 Year</option>
                    <option value={"2 Year"}>2 Year</option>
                    <option value={"3 Year"}>3 Year</option>
                    <option value={"4 Year"}>4 Year</option>
                    <option value={"5 Year"}>5 Year</option>
                    <option value={"6 Year"}>6 Year</option>
                    <option value={"7 Year"}>7 Year</option>
                    <option value={"8 Year"}>8 Year</option>
                    <option value={"9 Year"}>9 Year</option>
                    <option value={"10 Year"}>10 Year</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Fees</p>
                  <input
                    name="fees"
                    value={doctorInfo.fees}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                    type="number"
                    placeholder="Fees"
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>Specialty</p>
                  <select
                    name="specialty"
                    value={doctorInfo.specialty}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                  >
                    <option value={"General physician"}>
                      General physician
                    </option>
                    <option value={"Gynecologist"}>Gynecologist</option>
                    <option value={"Dermatologist"}>Dermatologist</option>
                    <option value={"Pediatricians"}>Pediatricians</option>
                    <option value={"Neurologist"}>Neurologist</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Education</p>
                  <input
                    name="education"
                    value={doctorInfo.education}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                    type="text"
                    placeholder="Education"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Address</p>
                  <input
                    name="line1"
                    value={doctorInfo.address.line1}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                    type="text"
                    placeholder="Address - 1"
                  />
                  <input
                    name="line2"
                    value={doctorInfo.address.line2}
                    onChange={onChangeInput}
                    className="border shadow rounded py-2 px-3"
                    type="text"
                    placeholder="Address - 2"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex-1 flex flex-col gap-1 mt-4">
                <p className="pb-2">About me</p>
                <textarea
                  name="about"
                  value={doctorInfo.about}
                  onChange={onChangeInput}
                  className="border shadow rounded py-2 px-3"
                  placeholder="Write about doctor"
                  rows={5}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-primary text-white px-10 py-3 rounded-full mt-5 "
                type="submit"
              >
                Add Doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDoctor;
