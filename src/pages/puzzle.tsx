import React from "react";
import Header from "../components/home/header";
import PuzzleMain from "../components/puzzle/main";

const PuzzlePage = () => {
  return (
    <main>
      <Header />
      <PuzzleMain size={{ x: 5, y: 5 }} colours={3} />
    </main>
  );
};

export default PuzzlePage;
