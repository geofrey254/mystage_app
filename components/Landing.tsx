import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { TbViewfinder } from "react-icons/tb";

function Landing() {
  return (
    <section className="bg-[#f8d082c2] w-full flex justify-center items-center max-[480px]:h-[85vh] md:h-[90vh] p-8 md:p-0">
      <div className="container grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="maps flex flex-col gap-7 md:gap-8">
          <div className="title">
            <h3 className="mystage-name font-semibold text-[#ffa800]">
              MyStage{" "}
              <span className="text-xs spanner text-[#392a0b] ml-8 md:ml-32">
                Find Your Stop
              </span>
            </h3>
            <h1 className="max-[400px]:text-4xl max-[480px]:text-5xl md:text-5xl xl:text-6xl lato-black text-[#392a0b]">
              You Want a Bus, Not a Scavenger Hunt!
            </h1>
          </div>
          <h4 className="text-md italic md:text-2xl text-[#392a0b]">
            No more &quot;Is it left, right, or...?&quot; moments.
          </h4>
          <p className="text-sm md:text-lg text-[#392a0b]">
            Tell us where you{"'"}re headed, and let us find the perfect bus
            stage for you. ✨ No more wandering or second-guessing—just enter
            your destination, and we{"'"}ll guide you directly there.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5">
            <Link
              href="/Map"
              className="bg-[#ffa800] flex justify-center gap-4 items-center hover:bg-[#f8da9a] border-2 border-[#3a2b0d] w-full md:w-1/2 xl:w-1/4 text-center p-2 text-md font-bold text-white shadow-lg"
            >
              Find your way
              <TbViewfinder size={20} />
            </Link>

            <Link
              href="/Buy-Coffee"
              className="bg-[#fef3dc] flex justify-center gap-4 items-center border-2 border-[#3a2b0d94] w-full md:w-1/2 xl:w-1/4 text-center p-2 text-md font-bold text-[#ffa800]  shadow-lg"
            >
              Feed My Coffee Habit
              <FaMoneyBill1Wave size={20} />
            </Link>
          </div>
        </div>
        <div className="hidden md:flex">
          <Image
            src="/photos/handy.png"
            width={850}
            height={250}
            alt="hand holding phone"
            className="mappy"
          />
        </div>
      </div>
    </section>
  );
}

export default Landing;
