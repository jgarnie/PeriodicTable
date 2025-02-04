import { useThree, useFrame, useLoader, Canvas } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import {
  Stage,
  Lightformer,
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  BakeShadows,
  useHelper,
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
  MeshReflectorMaterial,
} from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function Experience() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

const CarShow = () => {
  const { scene } = useGLTF('./rover.glb', true);

  useEffect(() => {
    if (!scene) {
      return;
    }
    console.log(scene);
  }, [scene]);

  return (
    <>
      <Environment background files={'/gardens.hdr'} ground={[0, 0, 0]} />
      <OrbitControls target={[0, 0, 0]} makeDefault maxPolarAngle={1.5} />
      <ambientLight intensity={2} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        ange={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
    </>
  );
};

const Ground = () => {
  return (
    <mesh rotation-x={Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial />
    </mesh>
  );
};
