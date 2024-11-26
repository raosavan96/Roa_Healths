import React from "react";
import { MainBanner } from "../Components/MainBanner";
import { SpecialityMunu } from "../Components/SpecialityMunu";
import { TopDoctors } from "../Components/TopDoctors";
import { SecBanner } from "./../Components/SecBanner";

function Home() {
  return (
    <>
      <div>
        <MainBanner />
        <SpecialityMunu />
        <TopDoctors />
        <SecBanner />
      </div>
    </>
  );
}

export default Home;
