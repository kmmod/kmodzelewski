import React, { useEffect } from "react";
import { Render } from "../../lib/main";
import { wrapper } from "../../styles/main.module.scss";

const Test = () => {
  useEffect(() => {
    new Render("test", "wrapper");
  });

  return (
    <main>
      <div className={wrapper} id={"wrapper"}>
        <canvas id="test" />
      </div>
    </main>
  );
};

export default Test;
