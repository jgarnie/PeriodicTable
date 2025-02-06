import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAtomicContext } from './context/ElementContext';
import styled from 'styled-components';
import AtomPlaceholder from './AtomPlaceholder';

const Nucleus = ({ protons, neutrons }) => {
  const nucleusRef = useRef();
  const particles = [];

  for (let i = 0; i < protons; i++) {
    particles.push({
      position: [Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5],
      color: 'red',
    });
  }

  for (let i = 0; i < neutrons; i++) {
    particles.push({
      position: [Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5],
      color: 'blue',
    });
  }

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

const Electron = ({ radius, speed, angle, color, index }) => {
  const electronRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + index / 10;
    electronRef.current.position.x = Math.cos(t + angle) * radius;
    electronRef.current.position.z = Math.sin(t + angle) * radius;
    electronRef.current.position.y = Math.cos(t - angle) * radius;
  });

  return (
    <mesh ref={electronRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Atom = () => {
  const { atom } = useAtomicContext();

  if (!Object.keys(atom).length) return <AtomPlaceholder />;

  const { protons, neutrons, electrons } = atom;

  return (
    <StyledCanvas>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <OrbitControls />

        <Nucleus protons={protons} neutrons={neutrons} />

        {[...Array(electrons)].map((_, index) => (
          <Electron
            key={index}
            index={index}
            radius={1 + Math.random()}
            speed={1 + (index % Math.random()) * 0.5}
            angle={index * 10}
            color="yellow"
          />
        ))}
      </Canvas>
    </StyledCanvas>
  );
};

export default Atom;

const StyledCanvas = styled.div`
  height: 100%;
  min-width: 50vh;
`;
