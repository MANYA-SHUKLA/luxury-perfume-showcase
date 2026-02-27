import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./ProductPreview3D.css";

function Bottle() {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.28, 0.7, 24]} />
        <meshStandardMaterial
          color="#2d281f"
          metalness={0.15}
          roughness={0.35}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.25, 16]} />
        <meshStandardMaterial
          color="#1c1917"
          metalness={0.25}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 24]} />
        <meshStandardMaterial
          color="#a67c52"
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-far={10}
        shadow-camera-left={-1.5}
        shadow-camera-right={1.5}
        shadow-camera-top={1.5}
        shadow-camera-bottom={-1.5}
      />
      <directionalLight position={[-2, 2, 2]} intensity={0.4} />
      <pointLight position={[0, 2, 2]} intensity={0.3} />
      <Bottle />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </>
  );
}

export default function ProductPreview3D({ onClose, productName }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="product-preview-3d" role="dialog" aria-modal="true" aria-label={`3D preview of ${productName || "product"}`}>
      <div className="product-preview-3d-backdrop" onClick={onClose} aria-hidden />
      <div className="product-preview-3d-content">
        <button
          type="button"
          className="product-preview-3d-close"
          onClick={onClose}
          aria-label="Close 3D preview"
        >
          ×
        </button>
        <div className="product-preview-3d-canvas-wrap">
          <Canvas
            shadows
            camera={{ position: [0, 0, 1.8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>
        </div>
        <p className="product-preview-3d-hint">Drag to rotate · Scroll to zoom</p>
      </div>
    </div>
  );
}
