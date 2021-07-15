import React from "react";
import { content } from "../styles/main.module.scss";
import Nav from "../components/nav";

const BlogPage = () => {
  return (
    <>
      <Nav />
      <div className={content}>
        <h4>Blog</h4>
      </div>
    </>
  );
};

export default BlogPage;
