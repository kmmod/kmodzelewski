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
      varying vec3 vViewPosition;
      varying vec3 eyeVector;
      varying vec3 worldNormal;

      #include <common>

      void main() {
        vUv = position;

        vec4 worldPos = modelMatrix * vec4( position, 1.0);
        eyeVector = normalize(worldPos.xyz - cameraPosition);
        worldNormal = normalize( modelViewMatrix * vec4(normal, 0.0)).xyz;

        float modX = (sin(time * 0.6) * position.z * 2.0);
        float modY = (sin(time * 0.3) * position.x * sin(time + 0.5) * 5.0);
        float modZ = (sin(time * 0.4) * position.y * 3.0);
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
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      uniform vec3 specular;
      varying vec3 vUv;

      varying vec3 eyeVector;
      varying vec3 worldNormal;

      #include <common>
      #include <bsdfs>
      #include <lightmap_pars_fragment>
      #include <lights_pars_begin>
      #include <lights_phong_pars_fragment>
      #include <specularmap_pars_fragment>

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
        vec3 phase = vec3(0.0, 0.1, 0.2);

        float shininess = 0.5;
        
        vec3 color = cosPalette(time, brightness, contrast, oscilation, phase);
        
        ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
        reflectedLight.indirectDiffuse += vec3( 1.0 );
        reflectedLight.indirectDiffuse *= diffuseColor.rgb;

        // accumulation
        #include <lights_phong_fragment>
        #include <lights_fragment_begin>
        #include <lights_fragment_maps>
        #include <lights_fragment_end>


	      vec3 outgoingLight = mix(reflectedLight.indirectDiffuse , color, vUv.y) + reflectedLight.directSpecular;
        // gl_FragColor = vec4(mix(colorA, colorB, vUv.y), 1.0);
        gl_FragColor = vec4( outgoingLight, diffuseColor.a );
        // gl_FragColor = vec4( color, 1.0 );
        
        #include <tonemapping_fragment>
      }
    `;
  };

  const uniforms = {
    colorA: { type: "vec3", value: new THREE.Color(0xffd278) },
    colorB: { type: "vec3", value: new THREE.Color(0x217aff) },
    specular: { type: "vec3", value: new THREE.Color(0xffffff) },
    time: { value: 0.0 },
  };

  const timeJump = {
    value: 0.0,
  };

  const interval = setInterval(() => {
    timeJump.value += 0.01;
    uniforms.time.value = Math.sin(timeJump.value);
  }, 16);

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        wireframe={false}
        color={"orange"}
        roughness={1.0}
        metalness={0.995}
        clearcoat={0.95}
        clearcoatRoughness={0.93}
      />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader()}
        fragmentShader={fragmentShader()}
      />
    </mesh>
  );
};
