import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const modelPaths = {
  Vision: "/models/visionmodel-draco.glb",
  GeoWorks: "/models/geoworksmodel-draco.glb",
  Studios: "/models/studiosmodel-draco.glb",
};

const modelTransforms = {
  Vision: {
    position: [50, -300, -600],
    rotation: [-0.4, -Math.PI/2.2, -0.4],
    scale: 2,
  },
  GeoWorks: {
    position: [100, -465, -400],
    rotation: [3.50225, 0.2, 3.115], 
    scale: 7,
  },
  Studios: {
    position: [40, -150, -550],
    rotation: [0.3, -0.4, 0],
    scale: 8,
  },
};


export function preloadModels() {
  Object.values(modelPaths).forEach((path) => useGLTF.preload(path));
}

export function DynamicModel({ modelName }) {
  const path = modelPaths[modelName];
  const gltf = useGLTF(path);

  const { position, rotation, scale } = modelTransforms[modelName] || {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
  };

  const scene = useMemo(() => gltf.scene.clone(), [gltf]);

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
