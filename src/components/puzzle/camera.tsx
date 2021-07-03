import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import gsap from "gsap";

export const Camera = (props: any) => {
  const camera = useRef(null) as MutableRefObject<any>;

  useEffect(() => {
    const cameraPosition = () => {
      const maxSize = Math.max(props.size.x, props.size.y);
      const fitHeightDistance =
        maxSize / (2 * Math.atan((Math.PI * camera.current.fov) / 360));

      const fitWidthDistance = fitHeightDistance / camera.current.aspect;
      const distance = Math.max(fitHeightDistance, fitWidthDistance);

      moveCamera(distance);
    };

    if (window !== undefined) window.addEventListener("resize", cameraPosition);

    cameraPosition();
  }, [props.size]);

  const moveCamera = (distance: number) => {
    gsap.to(camera.current.position, { z: distance, duration: 1.0 });
  };

  return (
    <PerspectiveCamera ref={camera} makeDefault={true} position={[0, 0, 0]} />
  );
};
