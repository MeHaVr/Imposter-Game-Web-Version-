import React from "react";
import { useTime, useTransform, useMotionValueEvent } from "motion/react";

const Loading = () => {
  const time = useTime();

  const dotIndex = useTransform(time, (t) => Math.floor((t / 500) % 3));

  const [dots, setDots] = React.useState("");

  useMotionValueEvent(dotIndex, "change", (v) => {
    setDots(".".repeat(v + 1));
  });
  return (
    <div className="bg-animation w-screen h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white text-center">
        Laden
        {dots}
      </h1>
    </div>
  );
};

export default Loading;
