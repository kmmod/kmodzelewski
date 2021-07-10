import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { scoreState } from "../core/state";

export const Score = (props: any): any => {
  const score = useRecoilValue(scoreState);

  useEffect(() => {
    props.updateScore(score);
  }, [score]);

  return null;
};
