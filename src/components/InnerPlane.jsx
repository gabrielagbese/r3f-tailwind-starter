import { Plane } from "@react-three/drei"

export default function InnerPlane() {
  return (
    <Plane args={[15, 15]} rotation-x={-Math.PI / 2} position={[0, 0.02, 0]} receiveShadow>
      <meshStandardMaterial
        color="#6f6f6f"
        roughness={0.7}
        metalness={0.3}
        envMapIntensity={0.7}
      />
    </Plane>
  )
}

