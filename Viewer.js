import { useParams } from 'react-router-dom';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Viewer() {
  const { id } = useParams();
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <ambientLight />
      <directionalLight position={[2, 2, 5]} />
      <Model url={`http://localhost:5000/models/${id}`} />
      <OrbitControls />
    </Canvas>
  );
}
