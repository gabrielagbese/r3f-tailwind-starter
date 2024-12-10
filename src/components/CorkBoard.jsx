import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { Vector3 } from 'three'

export function CorkBoard(props) {
  const { nodes, materials } = useGLTF('./models/cork_board.glb')

  return (
    <group {...props} dispose={null}>
      <group scale={[0.015, 0.03, 0.04]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_Material_0.geometry}
          material={materials.Material}
          rotation={[Math.PI / 2, 0, -1.6]}

          scale={100}
        />
      </group>
    </group>
  )
}