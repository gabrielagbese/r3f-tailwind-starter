import { Canvas } from "@react-three/fiber";
import { Sky, Environment, AccumulativeShadows, RandomizedLight, CameraControls } from "@react-three/drei";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import OuterPlane from "./OuterPlane";
import OuterWalls from "./OuterWalls";
import InnerPlane from "./InnerPlane";
import InnerWalls from "./InnerWalls";
import Room from "./Room";

export default function Scene() {
  const [fov, setFov] = useState(45); // Default FOV
  const controlsRef = useRef();

  useLayoutEffect(() => {
    const updateFov = () => {
      if (window.innerWidth < 768) {
        // Smaller screen (e.g., mobile)
        setFov(100);  // Wider FOV for smaller screens
      } else {
        // Larger screen (e.g., desktop)
        setFov(45);  // Default FOV for larger screens
      }
    };

    // Set the initial FOV based on the screen size
    updateFov();
    window.addEventListener("resize", updateFov);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateFov);
    };
  }, []);

  useEffect(() => {
    // Set the camera to look at a specific point when the component mounts
    if (controlsRef.current) {
      controlsRef.current.setLookAt(0, 14, 12.1, 0, 9, 0, true); // Camera position: (0, 10, 15), LookAt target: (0, 0, 0)
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 14, 12.1], fov: 55 }}>
        <Sky sunPosition={[-10, 20, -0]} />
        <Environment preset="sunset" />

        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[-50, 20, -0]}
          intensity={2.5}
          shadow-mapSize={1024}
          shadow-camera-far={100}
          shadow-camera-top={50}
          shadow-camera-right={50}
          shadow-camera-bottom={-50}
          shadow-camera-left={-50}
        />

        <AccumulativeShadows temporal frames={200} color="black" colorBlend={0.5} opacity={1} scale={80} position={[0, -0.01, 0]}>
          <RandomizedLight amount={8} radius={10} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
        </AccumulativeShadows>

        <OuterPlane />
        <OuterWalls />
        <InnerPlane />
        <InnerWalls />
        <Room />

        {/* CameraControls with ref */}
        <CameraControls ref={controlsRef}
          minDistance={1}      // Minimum distance the camera can be from the target
          maxDistance={12.1}     // Maximum distance the camera can be from the target
          movementSpeed={5}    // Speed at which the camera moves
          enableDamping />
      </Canvas>
    </div>
  );
}
