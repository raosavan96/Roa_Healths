import React from "react";
import { assets } from "../assets/assets";

export const Footer = () => {
  return (
    <>
      <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 my-10 text-sm">
          <div>
            <img className="w-20 mb-5" src={assets.logo} alt="" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              esse alias voluptates voluptatibus nesciunt commodi ad obcaecati,
              facere aut impedit dolores enim fuga, deserunt maiores tempora
              cupiditate, amet consequuntur?
            </p>
          </div>
          <div>
            <h5 className="text-base font-medium mb-5 mt-4">COMPANY</h5>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>About</li>
              <li>About us</li>
              <li>Contect us</li>
            </ul>
          </div>
          <div>
            <h5 className="text-base font-medium mb-5 mt-4">GET IN TOUCH</h5>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>+91-323-343-5443</li>
              <li>test22@gamil.com</li>
            </ul>
          </div>
        </div>
        <div className="py-5">
          <p className=" text-sm  text-center">
            Copyright 2024@ Rao - All Right Reserved.
          </p>
        </div>
      </div>
    </>
  );
};
