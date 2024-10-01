"use client";
import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1b0731] gap-12">
      <Image
        src={"/logo1.png"}
        height={500}
        width={500}
        alt="Logo_NCL"
        unoptimized={true}
        className="loading-img"
      />
      <h2 className="text-4xl text-black font-bold ncl_title nerko">
        Njugush Creatives
      </h2>
    </div>
  );
}
