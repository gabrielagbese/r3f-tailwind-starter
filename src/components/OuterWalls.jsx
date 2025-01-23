import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export default function OuterWalls() {
  const wallThickness = 0.5
  const wallHeight = 3
  const planeSize = 40

  const WallSegment = ({ args, position }) => (
    <RigidBody type="fixed" colliders="trimesh">
      <Box args={args} position={position} castShadow receiveShadow>
        <meshStandardMaterial
          color="#4f4f4f"
          roughness={0.7}
          metalness={0.2}
          envMapIntensity={0.5}
        />
      </Box>
    </RigidBody>
  )

  return (
    <group>
      <WallSegment args={[planeSize * 2, wallHeight, wallThickness]} position={[0, wallHeight / 2, -planeSize]} />
      <WallSegment args={[planeSize * 2, wallHeight, wallThickness]} position={[0, wallHeight / 2, planeSize]} />
      <WallSegment args={[wallThickness, wallHeight, planeSize * 2]} position={[planeSize, wallHeight / 2, 0]} />
      <WallSegment args={[wallThickness, wallHeight, planeSize * 2]} position={[-planeSize, wallHeight / 2, 0]} />
    </group>
  )
}

