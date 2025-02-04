import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { MeshStandardMaterial, SphereGeometry } from 'three';

const solarSystem = [
  {
    name: 'Mercury',
    moons: { number: 0, details: [] },
    color: '#5A5A5A',
    diameter: 4879,
  },
  {
    name: 'Venus',
    moons: { number: 0, details: [] },
    color: '#E6C36C',
    diameter: 12104,
  },
  {
    name: 'Earth',
    moons: {
      number: 1,
      details: [{ name: 'Moon', color: '#C0C0C0', size: 3474 }],
    },
    color: '#1E90FF',
    diameter: 12742,
  },
  {
    name: 'Mars',
    moons: {
      number: 2,
      details: [
        { name: 'Phobos', color: '#5A5A5A', size: 22.4 },
        { name: 'Deimos', color: '#5A5A5A', size: 12.4 },
      ],
    },
    color: '#B22222',
    diameter: 6779,
  },
  {
    name: 'Jupiter',
    moons: {
      number: 79,
      details: [
        { name: 'Ganymede', color: '#D3D3D3', size: 5268 },
        { name: 'Callisto', color: '#8B4513', size: 4820 },
        { name: 'Io', color: '#FFD700', size: 3643 },
        { name: 'Europa', color: '#AFEEEE', size: 3121 },
        { name: 'Amalthea', color: '#C19A6B', size: 167 },
        { name: 'Himalia', color: '#8B7D6B', size: 170 },
        { name: 'Elara', color: '#7B7B7B', size: 80 },
        { name: 'Pasiphae', color: '#5D5D5D', size: 58 },
        { name: 'Carme', color: '#4F4F4F', size: 46 },
      ],
    },
    color: '#DAA520',
    diameter: 139820,
  },
  {
    name: 'Saturn',
    moons: {
      number: 83,
      details: [
        { name: 'Titan', color: '#D2691E', size: 5150 },
        { name: 'Enceladus', color: '#FFFFFF', size: 504 },
        { name: 'Mimas', color: '#D3D3D3', size: 396 },
        { name: 'Tethys', color: '#E6E6E6', size: 1062 },
        { name: 'Dione', color: '#BEBEBE', size: 1123 },
        { name: 'Rhea', color: '#A9A9A9', size: 1527 },
        { name: 'Iapetus', color: '#8B4513', size: 1469 },
        { name: 'Phoebe', color: '#2F4F4F', size: 213 },
      ],
    },
    color: '#FFD700',
    diameter: 116460,
  },
  {
    name: 'Uranus',
    moons: {
      number: 27,
      details: [
        { name: 'Titania', color: '#696969', size: 1578 },
        { name: 'Oberon', color: '#808080', size: 1523 },
        { name: 'Umbriel', color: '#708090', size: 1169 },
        { name: 'Ariel', color: '#C0C0C0', size: 1158 },
        { name: 'Miranda', color: '#A9A9A9', size: 471 },
      ],
    },
    color: '#AFEEEE',
    diameter: 50724,
  },
  {
    name: 'Neptune',
    moons: {
      number: 14,
      details: [
        { name: 'Triton', color: '#4682B4', size: 2706 },
        { name: 'Proteus', color: '#5A5A5A', size: 420 },
        { name: 'Nereid', color: '#808080', size: 340 },
        { name: 'Larissa', color: '#BEBEBE', size: 194 },
        { name: 'Despina', color: '#C0C0C0', size: 150 },
        { name: 'Galatea', color: '#A9A9A9', size: 175 },
      ],
    },
    color: '#00008B',
    diameter: 49244,
  },
];

const Planets = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(2);

  return (
    <>
      <div>
        {solarSystem.map((planet, index) => (
          <button onClick={() => setSelectedPlanet(index)} key={planet.name}>
            {planet.name}
          </button>
        ))}
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} />
        <PlanetView selectedPlanet={selectedPlanet} />
      </Canvas>
    </>
  );
};

const PlanetView = ({ selectedPlanet }) => {
  const { camera } = useThree();
  const planet = solarSystem[selectedPlanet];
  const planetRadius = planet.diameter / 2000;

  useEffect(() => {
    camera.position.set(0, 0, planetRadius * 3);
    camera.lookAt(0, 0, 0);
  }, [selectedPlanet, camera, planetRadius]);

  return (
    <>
      <OrbitControls
        minDistance={planetRadius * 1.2}
        maxDistance={planetRadius * 15}
      />

      <mesh>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial color={planet.color} transparent opacity={0.3} />
      </mesh>

      <Moons selectedPlanet={selectedPlanet} planetRadius={planetRadius} />
    </>
  );
};

const Moons = ({ selectedPlanet, planetRadius }) => {
  const moonRefs = useRef([]);
  const planet = solarSystem[selectedPlanet];

  if (!planet || !planet.moons || !planet.moons.details) {
    return null;
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    moonRefs.current.forEach((moon, index) => {
      if (moon) {
        const angle = index * (Math.PI / 4);
        moon.position.x =
          Math.cos(time + angle) * (planetRadius + 15 + index * 10);
        moon.position.z =
          Math.sin(time + angle) * (planetRadius + 15 + index * 10);
      }
    });
  });

  return (
    <>
      {planet.moons.details.map((moonData, index) => (
        <mesh key={index} ref={(el) => (moonRefs.current[index] = el)}>
          <sphereGeometry args={[moonData.size / 3000, 32, 32]} />
          <meshStandardMaterial color={moonData.color} />
        </mesh>
      ))}
    </>
  );
};

export default Planets;
