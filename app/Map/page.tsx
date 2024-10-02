import React from "react";
import dynamic from "next/dynamic";

function page() {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  return (
    <div>
      <Map />
    </div>
  );
}

export default page;
