import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../product/card.jsx";

export default function BestSelling() {
  return (
    <>
      <section className=" bg-white flex flex-col  justify-center">
        <div className="self-center w-full max-w-[1224px] items-stretch justify-between gap-5  max-md:max-w-full max-md:flex-wrap">
          <div className=" flex justify-between py-9">
            <h1 className=" text-2xl font-semibold">BestSelling</h1>
            <div className="flex flex-row justify-center gap-2 hover:text-primary">
              <button className="text-2xl font-semibold capitalize">
                More
              </button>
              <div className=" flex justify-center flex-col ">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xl font-semibold "
                />
              </div>
            </div>
          </div>
          <section className="">
            <div className="wfull grid md:grid-cols-5  gap-4 ">
              <Card num={5} />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
