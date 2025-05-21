import React from "react";
import error404 from "../../src/assets/error404.JPG";
import "../App.css";
import { Link, useNavigate } from "react-router";
import Navbar from "../Components/Navbar";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <div className="bg-gray-100 h-[100vh] border">
      <Navbar></Navbar>
      <div className="flex font-pj bg-gray-100 mb-10 p-5 justify-center items-center">
        {/* Main Div */}
        <div className="flex justify-center items-center flex-col gap-10">
          <div className="w-3/4 rounded-2xl bg-gray-300 lg:p-10 md:p-8">
            <img className="rounded-2xl" src={error404} alt="" />
          </div>
          <h1 className=" max-sm:text-sm  max-sm:text-center font-semibold">
            OOPS! The page you are looking for is not exist. Sorry for the
            Inconvenience
          </h1>
          <Link to="/">
            <button
              onClick={handleGoHome}
              className="btn rounded-2xl text-white px-10 bg-[#176AE5]"
            >
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
