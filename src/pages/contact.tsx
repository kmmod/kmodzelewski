import React from "react";
import { content } from "../styles/main.module.scss";
import Nav from "../components/nav";

const ContactPage = () => {
  return (
    <>
      <Nav />
      <div className={content}>
        <h4>Contact</h4>
      </div>
    </>
  );
};

export default ContactPage;
