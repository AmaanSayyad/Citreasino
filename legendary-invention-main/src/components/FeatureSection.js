'use client';
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";

function Icosahedron({ radius = 3, detail = 0, speed = 0.7, ...props }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.x += delta * speed));
  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <icosahedronGeometry args={[radius, detail]} />
      <meshPhysicalMaterial
        color={hovered ? "hotpink" : "hotpink"}
        reflectivity={0.8}
        iridescence={0.427}
      />
    </mesh>
  );
}

export default function FeatureSection() {
  return (
    <section id="feature" className="py-14 px-[126px] relative">
      {/* 3D Animation */}
      <Canvas
        style={{
          position: "absolute",
          width: "min(550px, 65%)",
          bottom: 60,
          height: 300,
          zIndex: 1,
        }}
      >
        <ambientLight intensity={Math.PI / 5} />
        <spotLight position={[-7, 0, 12]} angle={0.35} penumbra={1} decay={0} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Icosahedron position={[-1.5, -1, -1]} rotation={[0, 3, 3.2]} radius={4} />
        <Icosahedron position={[2, -1.5, 2]} rotation={[0, -3.2, 3]} scale={0.5} speed={1.2} />
      </Canvas>

      {/* Section Header */}
      <h1 className="font-display text-[32px] leading-[40px] text-center text-white">
        Key Features of PowerPlay
      </h1>

      {/* Features Grid */}
      <div className="grid grid-cols-2 py-11 px-20 gap-12 mt-14 bg-ruby rounded-3xl z-10 relative">
        {/* First Column */}
        <div id="first-col">
          <h2 className="text-dark-kiss text-sm font-semibold">Overview</h2>
          <h1 className="text-white my-5 text-[32px] leading-[40px] font-bold">
            Traditional Casinos vs PowerPlay
          </h1>
          <p className="text-white/[0.6] font-medium leading-relaxed">
            Traditional online casinos often lack transparency, leaving players
            to trust platforms without proof of fairness. Common issues include
            rigged games, hidden terms, and restrictive policies. PowerPlay
            leverages Citrea blockchain to provide a transparent, provably fair
            gaming experience. Key features include:
          </p>
          <ul className="list-disc pl-6 text-white/[0.6] mt-4 font-medium">
            <li>Community Leaderboard: Compete and view top players' achievements.</li>
            <li>Profile Exploration: Explore player profiles, activities, and ENS.</li>
          </ul>
        </div>

        {/* Second Column */}
        <div id="second-col" className="flex flex-col gap-6">
          {/* Feature Cards */}
          <div className="border border-[#E504983D] p-5 flex flex-col gap-3 inner-purple-shadow rounded-xl">
            <h2 className="text-dark-kiss text-sm font-semibold">
              Transparent and Fully On-Chain GambleFi
            </h2>
            <p className="text-white">
              PowerPlay ensures transparency with fully on-chain randomness
              using our VRF module, guaranteeing verifiably fair outcomes for
              every game.
            </p>
          </div>

          <div className="border border-[#E504983D] p-5 flex flex-col gap-3 inner-purple-shadow rounded-xl">
            <h2 className="text-dark-kiss text-sm font-semibold">DeFi Integration</h2>
            <p className="text-white">
              Cross-chain lending enables token deposits on supported chains as
              collateral to borrow CBTC, ensuring seamless gameplay without selling assets.
            </p>
            <ul className="list-disc pl-6 text-white mt-2">
              <li>Real-time asset prices for accurate lending calculations.</li>
              <li>Effortless cross-chain asset transfers.</li>
            </ul>
          </div>

          <div className="border border-[#E504983D] p-5 flex flex-col gap-3 inner-purple-shadow rounded-xl">
            <h2 className="text-dark-kiss text-sm font-semibold">No Traps, No Restrictions</h2>
            <p className="text-white">
              Enjoy flexible withdrawal policies, transparent bonus schemes, and full control
              over your assets through decentralized asset management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
