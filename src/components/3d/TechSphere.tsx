import { Sphere, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../hooks/useTheme";

export const TechSphere = memo(() => {
  const { theme } = useTheme();
  const sphereRef = useRef<THREE.Group>(null);
  const textRefs = useRef<THREE.Group[]>([]);

  // Memoize technologies to prevent recreation on rerenders
  const technologies = useMemo(
    () => [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "MongoDB", color: "#47A248" },
      { name: "Express", color: theme === "dark" ? "#ffffff" : "#000000" },
      { name: "React Native", color: "#61DAFB" },
      { name: "ASP.NET", color: "#512BD4" },
      { name: "MSSQL", color: "#CC2927" },
      { name: "Three.js", color: theme === "dark" ? "#ffffff" : "#000000" },
      { name: "Tailwind", color: "#06B6D4" },
      { name: "Git", color: "#F05032" },
      { name: "Docker", color: "#2496ED" },
    ],
    [theme]
  );

  // Memoize positions to avoid recalculations
  const positions = useMemo(() => {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const radius = 2;

    for (let i = 0; i < technologies.length; i++) {
      const y = 1 - (i / (technologies.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y) * radius;
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      points.push(new THREE.Vector3(x, y * radius, z));
    }

    return points;
  }, [technologies.length]);

  // Optimize the frame update function
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Slower rotation for better performance
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }

    // Update positions less frequently by only updating every other frame
    if (Math.floor(clock.getElapsedTime() * 10) % 2 === 0) {
      textRefs.current.forEach((textRef, i) => {
        if (textRef) {
          textRef.lookAt(0, 0, 0);
          textRef.position.copy(positions[i]);
        }
      });
    }
  });

  // Memoize colors
  const sphereColor = useMemo(
    () => (theme === "dark" ? "#rgba(0, 0, 0, 0.7)" : "#rgba(0, 0, 0, 0.5)"),
    [theme]
  );

  const lineColor = useMemo(
    () => (theme === "dark" ? "#4b5563" : "#9ca3af"),
    [theme]
  );

  return (
    <group>
      {/* Ambient Light */}
      <ambientLight intensity={0.5} />

      {/* Point Lights */}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Main Group */}
      <group ref={sphereRef}>
        {/* Core Sphere - reduced segments for better performance */}
        <Sphere args={[2, 32, 32]}>
          <meshPhongMaterial
            color={sphereColor}
            transparent
            opacity={0.3}
            wireframe
            wireframeLinewidth={2}
          />
        </Sphere>

        {/* Inner Sphere - reduced segments */}
        <Sphere args={[1.8, 24, 24]}>
          <meshPhongMaterial color={sphereColor} transparent opacity={0.1} />
        </Sphere>

        {/* Technology Labels */}
        {technologies.map((tech, i) => (
          <group
            key={tech.name}
            ref={(el) => {
              if (el) textRefs.current[i] = el;
            }}
            position={positions[i]}
          >
            <Text
              color={tech.color}
              fontSize={0.2}
              maxWidth={2}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign='center'
              anchorX='center'
              anchorY='middle'
              outlineWidth={0.004}
              outlineColor={theme === "dark" ? "#000000" : "#ffffff"}
            >
              {tech.name}
            </Text>
          </group>
        ))}

        {/* Connection Lines */}
        {positions.map((pos, i) => (
          <line key={i}>
            <bufferGeometry
              attach='geometry'
              attributes={{
                position: new THREE.BufferAttribute(
                  new Float32Array([0, 0, 0, pos.x, pos.y, pos.z]),
                  3
                ),
              }}
            />
            <lineBasicMaterial
              attach='material'
              color={lineColor}
              transparent
              opacity={0.3}
              linewidth={2}
            />
          </line>
        ))}
      </group>
    </group>
  );
});
