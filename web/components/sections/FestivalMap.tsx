"use client";

import dynamic from "next/dynamic";

const FestivalMap = dynamic(
  () => import("./Map"),
  {
    ssr: false,
  }
);

export default FestivalMap;