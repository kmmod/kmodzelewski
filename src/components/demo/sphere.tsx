import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

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

  const vertexShader = () => {
    return `
      uniform float time;
      varying vec3 vUv; 
      
      float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
      }

      void main() {
        vUv = position;

        float angle = cos(vUv.y * (0.0)) * 1.0;

        vec3 pos = position + (normal * noise(uv) * time * 3.0);

        vec4 modelViewPosition = modelViewMatrix * vec4(position, angle);
        gl_Position = projectionMatrix * modelViewPosition + vec4(pos, 1.0); 
      }
    `;
  };

  const fragmentShader = () => {
    return `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.y), 1.0);
      }
    `;
  };

  const uniforms = {
    colorA: { type: "vec3", value: new THREE.Color(0xff00aa) },
    colorB: { type: "vec3", value: new THREE.Color(0xffffff) },
    time: { value: 0.0 },
  };

  const timeJump = {
    value: 0.0
  }

  const interval = setInterval(() => {
    timeJump.value += 0.01;
    uniforms.time.value = Math.sin(timeJump.value);
  }, 10)

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader()}
        fragmentShader={fragmentShader()}
      />
      <meshPhysicalMaterial
        wireframe={false}
        color={"orange"}
        roughness={1.0}
        metalness={0.995}
        clearcoat={0.95}
        clearcoatRoughness={0.93}
      />
    </mesh>
  );
};
