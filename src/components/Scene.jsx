import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Environment, AccumulativeShadows, RandomizedLight, CameraControls, Loader, KeyboardControls, DeviceOrientationControls } from "@react-three/drei";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Physics, RigidBody } from '@react-three/rapier'
import Ecctrl from 'ecctrl'
import { EcctrlJoystick } from "ecctrl";
import OuterPlane from "./OuterPlane";
import OuterWalls from "./OuterWalls";
import * as THREE from 'three'


function Player({ gyroEnabled }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  // Update the camera position based on gyroscope or Ecctrl
  useFrame(() => {
    if (gyroEnabled && controlsRef.current) {
      controlsRef.current.update(); // Update DeviceOrientationControls
    }
  });

  return (
    <>
      {gyroEnabled && <DeviceOrientationControls ref={controlsRef} camera={camera} />}
      <KeyboardControls map={keyboardMap}>

        <Ecctrl
          camCollision={false} // disable camera collision detect (useless in FP mode)
          camInitDis={-0.01} // camera intial position
          camMinDis={-0.01} // camera zoom in closest position
          camFollowMult={1000} // give a big number here, so the camera follows the target (character) instantly
          camLerpMult={1000} // give a big number here, so the camera lerp to the followCam position instantly
          turnVelMultiplier={1} // Turning speed same as moving speed
          turnSpeed={100} // give it big turning speed to prevent turning wait time
          mode="CameraBasedMovement" // character's rotation will follow camera's rotation in this mode
          camTargetPos={{ x: 0, y: 3, z: 0 }}
        >
          <RigidBody type="fixed" colliders="trimesh">
            <mesh visible={false}>
              <cylinderGeometry args={[0.5, 0.5, 2, 16]} position={[0, 2, 0]} />
              <meshStandardMaterial color="red" />
            </mesh>
          </RigidBody>
        </Ecctrl>
      </KeyboardControls>
    </>
  );
}


export default function Scene() {
  const [fov, setFov] = useState(45); // Default FOV
  const controlsRef = useRef();
  const [gyroEnabled, setGyroEnabled] = useState(false); // Gyroscope toggle state


  useLayoutEffect(() => {
    const updateFov = () => {
      if (window.innerWidth < 768) {
        // Smaller screen (e.g., mobile)
        setFov(90);  // Wider FOV for smaller screens
      } else {
        // Larger screen (e.g., desktop)
        setFov(45);  // Default FOV for larger screens
      }
    };


    updateFov();
    window.addEventListener("resize", updateFov);

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
      {/* Toggle Button */}
      <button
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          backgroundColor: gyroEnabled ? '#4CAF50' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setGyroEnabled(!gyroEnabled)}
      >
        {gyroEnabled ? 'Disable Gyro' : 'Enable Gyro'}
      </button>
      <EcctrlJoystick
        buttonNumber={2}
        joystickPositionLeft={-20}
        joystickPositionBottom={-20}
        joystickBaseProps={{
          receiveShadow: true,
          scale: [0.55, 0.55, 0.55],
          material: new THREE.MeshBasicMaterial({ color: "#8f8f8f" })
        }}
        joystickStickProps={{
          castShadow: true,
          scale: [0.65, 0.65, 0.65],
          material: new THREE.MeshBasicMaterial({ color: "#A9A9A9" })
        }}
        joystickHandleProps={{
          scale: [0.7, 0.7, 0.7],
          material: new THREE.MeshBasicMaterial({ color: "#D3D3D3" })
        }}
      />
      <Canvas shadows camera={{ position: [0, 14, 12.1], fov: 55 }}>
        <Physics>
          {gyroEnabled && <DeviceOrientationControls />}
          <Player />
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
          <CameraControls ref={controlsRef}
            minDistance={1}      // Minimum distance the camera can be from the target
            maxDistance={100}     // Maximum distance the camera can be from the target
            movementSpeed={5}    // Speed at which the camera moves
            enableDamping />
        </Physics>
      </Canvas>
      <Loader />
    </div>
  );
}
