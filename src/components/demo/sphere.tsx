import React, {useEffect, useRef, useState} from "react";
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
    // @ts-ignore
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
      uniform float timeMod;
      varying vec3 vUv; 
      varying vec3 vViewPosition;
      varying vec3 eyeVector;
      varying vec3 worldNormal;

      #include <common>

      void main() {
        vUv = position;

        vec4 worldPos = modelMatrix * vec4( position, 1.0);
        eyeVector = normalize(worldPos.xyz - cameraPosition);
        worldNormal = normalize( modelViewMatrix * vec4(normal, 0.0)).xyz;

        float modX = (sin(time * timeMod * 0.6) * position.z * 2.0);
        float modY = (sin(time * timeMod * 0.3) * position.x * sin(time * timeMod + 0.5) * 5.0);
        float modZ = (sin(time * timeMod * 0.4) * position.y * 3.0);
        float posModX = position.x + position.z * modX;
        float posModY = position.y + position.x * modY;
        float posModZ = position.z + position.y * modZ;

        vec4 modelViewPosition = modelViewMatrix * vec4(posModX, posModY, posModZ, 1.0);
      	#include <begin_vertex>
        #include <project_vertex>
        vViewPosition = - mvPosition.xyz;
        gl_Position = projectionMatrix * modelViewPosition; 
      }
    `;
  };

  const fragmentShader = () => {
    return `
      uniform float time;
      uniform float timeMod;
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      uniform vec3 specular;
      varying vec3 vUv;

      varying vec3 eyeVector;
      varying vec3 worldNormal;

      #include <common>

      vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
      }   

      float Fresnel(vec3 eyeVector, vec3 worldNormal) {
        return pow( 1.0 + dot( eyeVector, worldNormal), 3.0 );
      }
      
      void main() {
        vec4 diffuseColor = vec4( colorA, 1.0 );

        #include <color_fragment>
        #include <specularmap_fragment>
        
        vec3 normal = worldNormal;
        float f = Fresnel(eyeVector, normal);

        vec3 brightness = vec3(0.5, 0.5, 0.5);
        vec3 contrast = vec3(0.5, 0.5, 0.5);
        vec3 oscilation = vec3(1.0, 1.0, 1.0);
        vec3 phase = vec3(0.9, 0.1, 0.2);

        float shininess = 0.5;
        
        vec3 color = cosPalette(time * timeMod * 0.25, brightness, contrast, oscilation, phase);
        
        ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
        reflectedLight.indirectDiffuse += vec3( 1.0 );
        reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	      vec3 outgoingLight = mix(reflectedLight.indirectDiffuse , color, vUv.z) + reflectedLight.directSpecular;
        // gl_FragColor = vec4(mix(colorA, colorB, vUv.y), 1.0);
        gl_FragColor = vec4( outgoingLight, diffuseColor.a );
      }
    `;
  };

  const uniforms = {
    colorA: {type: "vec3", value: new THREE.Color(0xffd278)},
    colorB: {type: "vec3", value: new THREE.Color(0x217aff)},
    specular: {type: "vec3", value: new THREE.Color(0xffffff)},
    time: {value: 0.0},
    timeMod: {value: 1.0}
  };

  const timeJump = {
    value: 0.0,
    boost: 0.0,
  };

  const interval = setInterval(() => {
    timeJump.value += 0.01 + timeJump.boost;
    uniforms.time.value = Math.sin(timeJump.value);
  }, 16);

  const changeTiming = (mod: number, boost: number) => {
    gsap.to(uniforms.timeMod, {value: mod, duration: 2})
    gsap.to(timeJump, {boost: boost, duration: 2})
  }

  return (
    <mesh ref={mesh}
          onPointerOver={() => changeTiming(2.0, 0.01)}
          onPointerOut={() => changeTiming(1.0, 0.0)}
    >
      {/*<sphereGeometry args={[1, 32, 32]}/>*/}
      <icosahedronGeometry args={[1, 24]}/>
      <meshPhysicalMaterial
        wireframe={false}
        color={"orange"}
        roughness={1.0}
        metalness={0.995}
        clearcoat={0.95}
        clearcoatRoughness={0.93}
      />
      <shaderMaterial
        wireframe={false}
        uniforms={uniforms}
        vertexShader={vertexShader()}
        fragmentShader={fragmentShader()}
      />
    </mesh>
  );
};
