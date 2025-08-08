import { Scroll } from '@react-three/drei';

const Overlay = () => {
  return (
    <Scroll html>
      <section className="h-screen p-10">
        <h1 className="text-2xl text-white">Section 1</h1>
      </section>
      <section className="h-screen p-10">
        <h1 className="text-2xl text-white">Section 2</h1>
      </section>
      <section className="h-screen p-10">
        <h1 className="text-2xl text-white">Section 3</h1>
      </section>
    </Scroll>
  );
};

export default Overlay;
