import { Box } from "@react-three/drei"

export default function InnerWalls() {
  const wallThickness = 0.5
  const wallHeight = 15
  const planeSize = 30
  const windowSize = 25
  const wallSegmentSize = (planeSize - windowSize) / 2

  const WallSegment = ({ args, position }) => (
    <Box args={args} position={position} castShadow receiveShadow>
      <meshStandardMaterial
        color="#3f3f3f"
        roughness={0.8}
        metalness={0.1}
        envMapIntensity={0.6}
      />
    </Box>
  )

  const WindowWall = ({ rotation = [0, 0, 0] }) => (
    <group rotation={rotation}>
      <WallSegment
        args={[wallSegmentSize, wallHeight, wallThickness]}
        position={[-planeSize / 4 - windowSize / 4, wallHeight / 2, -planeSize / 2]}
      />
      <WallSegment
        args={[wallSegmentSize, wallHeight, wallThickness]}
        position={[planeSize / 4 + windowSize / 4, wallHeight / 2, -planeSize / 2]}
      />
      {/*middle of window*/}
      <WallSegment
        args={[5, 15, 0.5]}
        position={[-6 + windowSize / 4, wallHeight / 2, -planeSize / 2]}
      />
      <WallSegment
        args={[windowSize, 2, wallThickness]}
        position={[0, 14, -planeSize / 2]}
      />
      <WallSegment
        args={[windowSize, wallHeight / 2.5, wallThickness]}
        position={[0, 1, -planeSize / 2]}
      />
    </group>
  )

  return (
    <group>
      <WindowWall rotation={[0, 0, 0]} />
      <WindowWall rotation={[0, Math.PI / 2, 0]} />
      <WallSegment args={[planeSize, wallHeight, wallThickness]} position={[0, wallHeight / 2, planeSize / 2]} />
      <WallSegment args={[wallThickness, wallHeight, planeSize]} position={[planeSize / 2, wallHeight / 2, 0]} />
    </group>
  )
}

