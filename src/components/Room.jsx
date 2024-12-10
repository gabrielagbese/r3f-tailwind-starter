import { Box, Cylinder } from "@react-three/drei";
import { CorkBoard } from "./CorkBoard";
import { Shelf } from "./Shelf";
import * as THREE from "three";

export default function Room() {
    const roomSize = 30;
    const roomHeight = 15;
    const wallThickness = 0.1;
    const tableHeight = 0.75;
    const tableThickness = 0.2;
    const legRadius = 0.1;

    const TableLeg = ({ position }) => (
        <Cylinder args={[legRadius, legRadius, 4.5]} position={position} castShadow receiveShadow>
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </Cylinder>
    );

    return (
        <group position={[0, 7.25, 0]}>
            {/* Room cube */}
            <mesh position={[0, 0, -roomSize / 2]}>
                <planeGeometry args={[roomSize, roomHeight]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>
            {/* Back face */}
            <mesh position={[0, 0, roomSize / 2]}>
                <planeGeometry args={[roomSize, roomHeight]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>
            {/* Left face */}
            <mesh position={[-roomSize / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[roomSize, roomHeight]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>
            {/* Right face */}
            <mesh position={[roomSize / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[roomSize, roomHeight]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>
            {/* Bottom face */}
            <mesh position={[0, -roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[roomSize, roomSize]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0}
                    side={THREE.DoubleSide}
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>

            {/* Ceiling */}
            {/* Front side (opaque) */}
            <mesh position={[0, roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[roomSize, roomSize]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Back side (transparent) */}
            <mesh position={[0, roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[roomSize, roomSize]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0} side={THREE.BackSide} />
            </mesh>

            {/* Glass Windows */}
            {/* Example window mesh on the side wall */}
            <mesh position={[0, 5, roomSize / 2 - wallThickness / 2]}>
                <planeGeometry args={[roomSize - 5, roomHeight - 5]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>

            {/* Table top */}
            <Box args={[roomSize - 2, tableThickness, 7]} position={[0, -2.75, -11]} castShadow receiveShadow>
                <meshStandardMaterial color="#8b4513" />
            </Box>

            {/* Table legs */}
            <TableLeg position={[13.5, -5, -14]} />
            <TableLeg position={[-13.5, -5, -14]} />
            <TableLeg position={[13.5, -5, -8]} />
            <TableLeg position={[-13.5, -5, -8]} />

            {/* CorkBoard and Shelf */}
            <CorkBoard position={[14.65, 2.5, -6]} />
            <Shelf position={[-13.25, -0.55, 0]} />
        </group>
    );
}
