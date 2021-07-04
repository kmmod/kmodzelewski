import React, { useState } from "react";
import Header from "../components/home/header";
import PuzzleMain from "../projects/puzzle/main";
import { PuzzleState } from "../projects/puzzle/components/puzzleState";

const PuzzlePage = () => {
  const [size, setSize] = useState({ x: 3, y: 3 });

  return (
    <main>
      <Header />
      <PuzzleState size={size} setSize={setSize} />
      <PuzzleMain size={size} colours={3} />
    </main>
  );
};

export default PuzzlePage;
