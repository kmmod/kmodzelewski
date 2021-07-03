import React, { useState } from "react";
import Header from "../components/home/header";
import PuzzleMain from "../components/puzzle/main";
import { PuzzleState } from "../components/puzzle/puzzleState";

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
