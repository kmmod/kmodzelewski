import React, { MutableRefObject, useRef, useState } from "react";
import Header from "../components/home/header";
import PuzzleMain from "../components/puzzle/main";

const PuzzlePage = () => {
  const sizeX = useRef() as MutableRefObject<HTMLInputElement>;
  const sizeY = useRef() as MutableRefObject<HTMLInputElement>;
  const [size, setSize] = useState({ x: 3, y: 3 });

  const onChange = () => {
    setSize({
      x: parseInt(sizeX.current.value),
      y: parseInt(sizeY.current.value),
    });
  };

  return (
    <main>
      <Header />
      <div style={{ margin: "1rem" }}>
        <input
          style={{ width: "2rem" }}
          type={"text"}
          ref={sizeX}
          defaultValue={size.x}
        />
        <input
          style={{ width: "2rem" }}
          type={"text"}
          ref={sizeY}
          defaultValue={size.y}
        />
        <button onClick={() => onChange()}>change</button>
      </div>
      <PuzzleMain size={size} colours={3} />
    </main>
  );
};

export default PuzzlePage;
