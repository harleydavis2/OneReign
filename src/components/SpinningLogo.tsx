"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import type { Group } from "three";

function LogoModel() {
  const { scene } = useGLTF("/logo.glb");
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.65;
    }
  });

  return (
    <group ref={groupRef} scale={0.205}>
      <primitive object={scene} />
    </group>
  );
}

export default function SpinningLogo({ size = 36 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 35 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
        legacy={false}
      >
        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight position={[4, 5, 6]} intensity={1.6} color="#4576ff" />
        <directionalLight position={[-3, -2, -3]} intensity={0.5} color="#1746ea" />
        <pointLight position={[0, 0, 4]} intensity={0.4} color="#ffffff" />
        <Suspense fallback={null}>
          <LogoModel />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
