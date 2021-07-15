import React from "react";
import { content } from "../styles/main.module.scss";
import Nav from "../components/nav";

const AboutPage = () => {
  return (
    <>
      <Nav />
      <div className={content}>
        <h4>About</h4>
      </div>
    </>
  );
};

export default AboutPage;
