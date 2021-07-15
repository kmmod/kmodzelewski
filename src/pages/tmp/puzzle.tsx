import React, { useState } from "react";
import Header from "../../components/home/header";
import PuzzleMain from "../../projects/puzzle/main";
import { GridSize } from "../../projects/puzzle/components/gridSize";

const PuzzlePage = () => {
  const [size, setSize] = useState({ x: 8, y: 8 });

  return (
    <main>
      <Header />
      <GridSize size={size} setSize={setSize} />
      <PuzzleMain size={size} colours={3} />
    </main>
  );
};

export default PuzzlePage;
