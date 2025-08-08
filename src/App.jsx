import { Canvas } from '@react-three/fiber';
import './App.css';
import Experience from './components/Experience';
import { ScrollControls } from '@react-three/drei';
import Overlay from './components/Overlay';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2], near: 0.1, far: 100 }}>
      <ScrollControls pages={3} damping={0.1}>
        <Overlay />
        <Experience />
      </ScrollControls>
    </Canvas>
  );
}

export default App;
