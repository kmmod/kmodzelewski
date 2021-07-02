import React from "react";
import {Link} from "gatsby";
import {title} from "../../styles/main.module.scss";

const Header = () => {
  return (
    <>
      <title>kmodzelewski</title>
      <Link to={"/"} style={{textDecoration: `none`}}>
        <h1 className={title}>kmodzelewski</h1>
      </Link>
    </>
  )
}

export default Header
