/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/shelf.glb 
Author: Mehdi Shahsavan (https://sketchfab.com/ahmagh2e)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/metal-shelf-5mb-1621362eb54d4571a49323ceb74f80fb
Title: Metal Shelf - 5MB
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Shelf(props) {
  const { nodes, materials } = useGLTF('./models/shelf.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={[0.05, 0.07, 0.045]}>
        <mesh castShadow
          receiveShadow
          geometry={nodes.Cloner_1__0.geometry} material={materials['Scene_-_Root']} position={[0, 50, 0]} rotation={[Math.PI / 1, 1.57, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/shelf.glb')
