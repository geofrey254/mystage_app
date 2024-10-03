import React from "react";

import dynamic from "next/dynamic";
import Loading from "../loading";

function page() {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <Loading />,
  });

  return (
    <div>
      <Map />
    </div>
  );
}

export default page;
