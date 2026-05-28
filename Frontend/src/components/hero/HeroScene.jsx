import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

function AnimatedSphere() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1.2, 64, 64]} scale={1.15}>
        <MeshDistortMaterial color="#8B5CF6" attach="material" distort={0.35} speed={2} roughness={0.2} metalness={0.6} />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none hidden lg:block">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
