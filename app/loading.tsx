"use client";
import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f5f4f2b8] gap-12">
      <Image
        src={"/logo2.png"}
        height={500}
        width={500}
        alt="Logo_NCL"
        unoptimized={true}
        className="loading-img"
      />
    </div>
  );
}
