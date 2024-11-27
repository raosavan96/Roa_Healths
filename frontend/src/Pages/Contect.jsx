import React from "react";
import { assets } from "../assets/assets";

export const Contect = () => {
  return (
    <>
      <div>
        <div className="text-center text-2xl pt-10 text-gray-500">
          <h3>
            CONTACT <span className="text-gray-700 font-medium">US</span>
          </h3>
        </div>
        <div className="flex  flex-col mt-10 justify-center md:flex-row gap-10 mb-28 text-sm">
          <img
            className="w-full md:max-w-[360px] shadow-xl"
            src={assets.contact_image}
            alt=""
          />

          <div className="flex flex-col justify-center gap-4  text-sm text-gray-600">
            <b className="text-gray-600 font-semibold text-lg">Our OFFICE</b>
            <p>
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <p>
              Tel: (91) 432‑5343 <br />
              Email: greatstackdev@gmail.com
            </p>

            <b className="text-gray-600 font-semibold text-lg">
              Careers at PRESCRIPTO
            </b>

            <p>Learn more about our teams and job openings.</p>
            <div>
              <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 active:bg-white active:text-black">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
