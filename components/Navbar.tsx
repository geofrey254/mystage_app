import React from "react";
import Image from "next/image";
import Logo from "@/public/weblogo.png";

function Navbar() {
  return (
    <nav className="sticky bg-white w-full h-[10vh] flex justify-center items-center top-0 z-10 border-b-2 border-[#ffa800] shadow-lg">
      <div className="container flex justify-center items-center text-center">
        <div className="left">
          <Image
            src={Logo}
            width={550}
            height={350}
            alt="mystage_logo"
            className="mystage w-[8rem] md:w-[8rem]"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
