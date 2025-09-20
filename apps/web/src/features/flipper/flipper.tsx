'use client'

import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./experience";
import { Fragment} from 'react'

declare global {
  interface window {
    innerWidth: number;
  }
}

export const Flipper = () => {
  return (
    <Fragment>
      <Loader />
      <Canvas shadows camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </Fragment>
  );
}