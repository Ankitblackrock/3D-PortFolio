import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cube005: THREE.Mesh;
    Cube005_1: THREE.Mesh;
    Cube005_2: THREE.Mesh;
    Cube005_3: THREE.Mesh;
    Cube005_4: THREE.Mesh;
    Cube005_5: THREE.Mesh;
    Cube005_6: THREE.Mesh;
  };
  materials: {
    Mat0: THREE.MeshStandardMaterial;
    Mat1: THREE.MeshStandardMaterial;
    Mat2: THREE.MeshStandardMaterial;
    Window_Frame: THREE.MeshStandardMaterial;
    Mat4: THREE.MeshStandardMaterial;
    Mat3: THREE.MeshStandardMaterial;
    Window: THREE.MeshStandardMaterial;
  };
};

type SpaceShipProps = {
  animable: { x: number; y: number };
} & JSX.IntrinsicElements["group"];

export default function SpaceShip({ animable, ...props }: SpaceShipProps) {
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf"
  ) as GLTFResult;
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = -2 * animable.x;
      ref.current.position.y = animable.y;
      ref.current.rotation.y = animable.y;
    }
  });

  return (
    <group
      ref={ref}
      {...props}
      position={[50, 0, 0]}
      scale={[20, 20, 30]}
      dispose={null}
    >
      <mesh geometry={nodes.Cube005.geometry} material={materials.Mat0} />
      <mesh geometry={nodes.Cube005_1.geometry} material={materials.Mat1} />
      <mesh geometry={nodes.Cube005_2.geometry} material={materials.Mat2} />
      <mesh
        geometry={nodes.Cube005_3.geometry}
        material={materials.Window_Frame}
      />
      <mesh geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
      <mesh geometry={nodes.Cube005_5.geometry} material={materials.Mat3} />
      <mesh geometry={nodes.Cube005_6.geometry} material={materials.Window} />
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf"
);
