import React from "react";
import { content } from "../styles/main.module.scss";
import Nav from "../components/nav";

const GamePage = () => {
  return (
    <>
      <Nav />
      <div className={content}>
        <h4>GameDev</h4>
      </div>
    </>
  );
};

export default GamePage;
