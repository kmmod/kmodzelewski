import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface color {
  r: number;
  g: number;
  b: number;
}

export const Sphere = () => {
  const mesh = useRef();

  useEffect(() => {
    const loopTime = 5;
    const colorLoop = setInterval(() => {
      animateColor(randomColor(), loopTime);
    }, loopTime * 1000);
    return () => clearInterval(colorLoop);
  }, []);

  const randomColor = (): color => {
    return {
      r: Math.random(),
      g: Math.random(),
      b: Math.random(),
    };
  };

  const animateColor = (newColor: color, duration: number) => {
    gsap.to(mesh.current.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
      duration: duration,
      repeat: 0,
      ease: "power1.inOut",
    });
  };

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        wireframe={false}
        color={"orange"}
        roughness={1.0}
        metalness={0.995}
        clearcoat={0.95}
        clearcoatRoughness={0.33}
      />
    </mesh>
  );
};
