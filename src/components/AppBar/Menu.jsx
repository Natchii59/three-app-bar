import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Menu({ closeMenu }) {
  return (
    <>
      <Line
        y={1.2}
        closeMenu={closeMenu}
        closeVisible={true}
        closeRotation={0.85}
      />

      <Line y={0} closeMenu={closeMenu} closeVisible={false} />

      <Line
        y={-1.2}
        closeMenu={closeMenu}
        closeVisible={true}
        closeRotation={-0.85}
      />
    </>
  );
}

function Line({ y, closeMenu, closeRotation, closeVisible }) {
  const meshBox = useRef();

  useFrame(({ clock }) => {
    const value = clock.getElapsedTime() / 2.5;

    meshBox.current.rotation.y = value;

    const position = meshBox.current.position;
    const rotation = meshBox.current.rotation;

    if (!closeMenu) {
      if (y > 0 && rotation.z > 0) {
        meshBox.current.rotation.z -= 0.04;
      } else if (y < 0 && rotation.z < 0) {
        meshBox.current.rotation.z += 0.04;
      }

      if (y > 0 && position.y < y) {
        meshBox.current.position.y += 0.04;
      } else if (y < 0 && position.y > y) {
        meshBox.current.position.y -= 0.04;
      }
    } else if (closeVisible) {
      if (y > 0 && rotation.z < closeRotation) {
        meshBox.current.rotation.z += 0.04;
      } else if (y < 0 && rotation.z > closeRotation) {
        meshBox.current.rotation.z -= 0.04;
      }

      if (y > 0 && position.y > 0) {
        meshBox.current.position.y -= 0.04;
      } else if (y < 0 && position.y < 0) {
        meshBox.current.position.y += 0.04;
      }
    }
  });

  return (
    <mesh
      ref={meshBox}
      position={[0, y, 0]}
      rotation={[0, 0, 0]}
      scale={[1.7, 1.7, 1.7]}
      visible={!closeMenu || closeVisible}
    >
      <boxGeometry attach='geometry' args={[2.3, 0.4, 0.4]} />
      <meshBasicMaterial color='black' />
    </mesh>
  );
}
