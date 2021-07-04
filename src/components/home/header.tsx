import React from "react";
import { Link } from "gatsby";
import { title } from "../../styles/main.module.scss";

const Header = () => {
  return (
    <>
      <title>kmodzelewski</title>
      <h1 className={title}>
        <Link to={"/"} style={{ textDecoration: `none` }}>
          kmodzelewski
        </Link>
      </h1>
    </>
  );
};

export default Header;
