import { Box, Plane } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export default function OuterPlane() {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <Box args={[80, 0.1, 80]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial
          color="#8f8f8f"
          roughness={0.8}
          metalness={0.2}
          envMapIntensity={0.5}
        />
      </Box>
    </RigidBody>
  )
}

