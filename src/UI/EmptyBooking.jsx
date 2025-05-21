import React from "react";
import "../App.css";
import { Link } from "react-router";

const EmptyBooking = () => {
  return (
    <div className="flex  lg:p-10 md:p-7 flex-col items-center">
      <h1 className="font-bold text-center lg:text-3xl max-sm:text-xl mt-10  mb-10 max-sm:mb-3">
        You have not Booked any appointment yet
      </h1>

      <p className="text-gray-500 text-center max-sm:text-sm">
        Our platform connects you With doctors across various soecialties — all
        at your convenience
      </p>

      <Link to="/">
        <button className="mt-10 bg-[#176AE5] text-white btn rounded-xl max-sm:mt-3">
          Book an Appointment
        </button>
      </Link>
    </div>
  );
};

export default EmptyBooking;
