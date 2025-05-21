import React, { Suspense, useState } from "react";
import Banner from "../../Components/Banner";
import Counter from "../../Components/Counter";
import { useLoaderData } from "react-router";
import DoctorContainer from "../../Components/DoctorContainer";

const Home = () => {
  const data = useLoaderData();

  const [searchedDoctor, setSearchedDoctor] = useState(data);

  const handleSearch = (e, text) => {
    e.preventDefault();
    if (!text || text === " ") {
      return setSearchedDoctor(data);
    }

    const filteredDoctors = data.filter(
      (doctor) =>
        doctor?.name?.toLowerCase().includes(text.toLowerCase()) ||
        doctor?.speciality?.toLowerCase().includes(text.toLowerCase()) ||
        doctor?.hospital?.toLowerCase().includes(text.toLowerCase())
    );

    setSearchedDoctor(filteredDoctors);
    console.log(text);
  };

  return (
    <div>
      <Banner handleSearch={handleSearch}></Banner>

      <DoctorContainer data={searchedDoctor}></DoctorContainer>

      <Counter></Counter>
    </div>
  );
};

export default Home;
