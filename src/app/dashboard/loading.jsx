"use client";

import { BallTriangle } from "react-loader-spinner";

export default function BallTriangleLoad() {
  return (
    <>
      <BallTriangle
        height={200}
        width={200}
        radius={5}
        color="#ffff"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass="text-primary-foreground"
        visible={true}
      />
    </>
  );
}
