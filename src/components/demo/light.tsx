import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const Light = (props: any) => {
  const light = useRef();

  useEffect(() => {
    const loopTime = props.time;
    const currentPos = light.current.position.y;
    const targetPos = currentPos * -1;
    animatePosition(targetPos, loopTime);
    const positionLoop = setInterval(() => {
      const currentPos = light.current.position.y;
      const targetPos = currentPos * -1;
      animatePosition(targetPos, loopTime);
    }, loopTime * 1000);
  }, []);

  const animatePosition = (targetPos: number, time: number) => {
    gsap.to(light.current.position, {
      y: targetPos,
      duration: time,
      ease: "power1.inOut",
    });
  };

  return <pointLight ref={light} {...props} />;
};
