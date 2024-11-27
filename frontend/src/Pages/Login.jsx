import React, { useEffect, useState } from "react";

function Login() {
  const [state, setState] = useState("Sign Up");
  const [loginMange, setLoginMange] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    const { value, name } = e.target;

    setLoginMange((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  console.log("loginMange", loginMange);

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-3 items-start p-8 min-w-[340px]  sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-semibold">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </p>
            <p>
              Please {state === "Sign Up" ? "sign up" : "login"} to book
              appointment
            </p>

            {state === "Sign Up" ? (
              <div className="w-full ">
                <p>Full Name</p>
                <input
                  type="text"
                  name="name"
                  value={loginMange.name}
                  onChange={handleInput}
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                />
              </div>
            ) : null}
            <div className="w-full ">
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={loginMange.email}
                onChange={handleInput}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
            <div className="w-full ">
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={loginMange.password}
                onChange={handleInput}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>

            <div className="w-full mt-4">
              <button
                className="bg-primary text-white py-2  w-full rounded-md text-base"
                type="submit"
              >
                {state === "Sign Up" ? "Create Account" : "Login"}
              </button>
            </div>

            <div>
              {state === "Sign Up" ? (
                <p>
                  Already have an account?
                  <span
                    onClick={() => setState("Login")}
                    className=" text-primary underline cursor-pointer ms-2"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p>
                  Create an account?
                  <span
                    onClick={() => setState("Sign Up")}
                    className=" text-primary underline cursor-pointer ms-2"
                  >
                    click hereclassName
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
