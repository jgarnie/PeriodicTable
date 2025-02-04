import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Nucleus = () => {
  const nucleusRef = useRef();

  const particles = [
    { position: [0, 0, 0], color: 'red' },
    { position: [0.3, 0.2, 0], color: 'gray' },
    { position: [-0.3, -0.2, 0.1], color: 'red' },
    { position: [0.1, -0.3, -0.2], color: 'gray' },
    { position: [-0.2, 0.1, -0.3], color: 'red' },
    { position: [0.2, -0.1, 0.3], color: 'gray' },
  ];

  return (
    <group ref={nucleusRef}>
      {particles.map((p, index) => (
        <mesh key={index} position={p.position}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
};

const Electron = ({ radius, speed, angle, color }) => {
  const electronRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    electronRef.current.position.x = Math.cos(t + angle) * radius;
    electronRef.current.position.z = Math.sin(t + angle) * radius;
  });

  return (
    <mesh ref={electronRef} position={[radius, 0, 0]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const LithiumAtom = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <OrbitControls />

      <Nucleus />

      <Electron radius={1} speed={1} angle={1} color="blue" />
      <Electron radius={1.5} speed={1.2} angle={Math.PI / 2} color="blue" />
      <Electron radius={1.2} speed={1.5} angle={Math.PI} color="blue" />

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </mesh>
    </Canvas>
  );
};

export default LithiumAtom;
