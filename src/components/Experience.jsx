import { OrbitControls, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Experience = () => {
  const boxModel = useRef();
  const tl = useRef();
  const scroll = useScroll();
  const { camera } = useThree();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    // Etiquetas para leer mejor
    tl.current.addLabel('start', 0);

    // a) Entrada inicial: desde fuera de cuadro
    tl.current.from(
      boxModel.current.position,
      {
        y: 2,
        z: 1, // un pelín hacia la cámara
        duration: 1.2,
        ease: 'power2.out',
      },
      'start'
    );

    // b) Fase 2: mover en X e Y y rotar un poco
    tl.current.to(
      boxModel.current.position,
      {
        x: 1,
        y: -0.5,
        duration: 1.2,
        ease: 'power1.inOut',
      },
      'start+=1.0'
    );

    tl.current.to(
      boxModel.current.rotation,
      {
        y: Math.PI * 0.5,
        x: Math.PI * 0.15,
        duration: 1.2,
        ease: 'power1.inOut',
      },
      'start+=1.0'
    );

    // c) Fase 3: “dolly” con la cámara para mantenerlo encuadrado y dar efecto de acercamiento
    //    En lugar de tocar FOV (que puede marear), movemos la cámara en Z
    tl.current.to(
      camera.position,
      {
        z: camera.position.z * 0.8, // acércate 20%
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        },
      },
      'start+=2.2'
    );

    // d) Fase 4: trayecto en Z (objeto avanza) y la cámara compensa hacia atrás
    tl.current.to(
      boxModel.current.position,
      {
        z: -1.0,
        duration: 1.0,
        ease: 'power2.inOut',
      },
      'start+=3.3'
    );

    tl.current.to(
      camera.position,
      {
        z: camera.position.z * 1.25, // te alejas para que no se salga
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        },
      },
      'start+=3.3'
    );

    // Limpieza al desmontar
    return () => {
      tl.current?.kill();
    };
  }, [camera]);

  useFrame(() => {
    if (!tl.current) return;
    const t = scroll.offset; // 0 → 1
    tl.current.seek(t * tl.current.duration());
  });

  return (
    <>
      <OrbitControls enableZoom={false} />
      <group ref={boxModel}>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </group>
    </>
  );
};

export default Experience;
