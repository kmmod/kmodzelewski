import React, { MutableRefObject, useRef } from "react";

export const GridSize = (props: any) => {
  const sizeX = useRef() as MutableRefObject<HTMLInputElement>;
  const sizeY = useRef() as MutableRefObject<HTMLInputElement>;

  const onChange = () => {
    const normalize = (val: number) => (val < 1 ? 1 : val);
    props.setSize({
      x: normalize(parseInt(sizeX.current.value)),
      y: normalize(parseInt(sizeY.current.value)),
    });
  };

  return (
    <div style={{ margin: "1rem" }}>
      <input
        style={{ width: "3rem" }}
        type={"number"}
        min={1}
        ref={sizeX}
        defaultValue={props.size.x}
      />
      <input
        style={{ width: "3rem", margin: "0.2rem" }}
        type={"number"}
        min={1}
        ref={sizeY}
        defaultValue={props.size.y}
      />
      <button onClick={() => onChange()}>change</button>
    </div>
  );
};
