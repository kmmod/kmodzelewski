import React from "react";
import { Link } from "gatsby";
import { container, pages, title, wrapper } from "../styles/nav.module.scss";

const Nav = () => {
  return (
    <div className={wrapper}>
      <div className={container}>
        <div className={title}>
          <Link to={"/"}>kmodzelewski</Link>
        </div>
        <div className={pages}>
          <Link to={"/gamedev"}>gamedev</Link>
          <Link to={"/blog"}>blog</Link>
          <Link to={"/about"}>about</Link>
          <Link to={"/contact"}>contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
