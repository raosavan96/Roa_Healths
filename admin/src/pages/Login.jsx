import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAtoken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/admin/admin-login",
          {
            email,
            password
          }
        );

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-[90vh] flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-3 items-start bg-white p-8 min-w-[320px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg"
        >
          <h3 className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state} </span>Login
          </h3>
          <div className="w-full">
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="border border-gray-300 px-3 w-full py-2 mt-1 rounded"
                type="email"
                required
              />
            </div>
            <div className="w-full mt-3">
              <p>Password</p>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="border border-gray-300 px-3 w-full py-2 mt-1 rounded"
                type="password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full rounded-md text-base py-2 mt-3"
          >
            Login
          </button>
          <div>
            {state === "Admin" ? (
              <p>
                Doctor Login?{" "}
                <span
                  className="ms-2 cursor-pointer underline text-primary"
                  onClick={() => setState("Doctor")}
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Admin Login?{" "}
                <span
                  className="ms-2 cursor-pointer underline text-primary"
                  onClick={() => setState("Admin")}
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
