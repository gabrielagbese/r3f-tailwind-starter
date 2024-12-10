import { Plane } from "@react-three/drei"

export default function OuterPlane() {
  return (
    <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
      <meshStandardMaterial 
        color="#8f8f8f" 
        roughness={0.8}
        metalness={0.2}
        envMapIntensity={0.5}
      />
    </Plane>
  )
}

