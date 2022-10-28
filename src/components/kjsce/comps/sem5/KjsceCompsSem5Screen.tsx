import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const KjsceCompsSem5Screen = (props: Props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/kjsce/comps/sem5/calculator">Calculator</Link>
        </li>
      </ul>
    </div>
  );
};

export default KjsceCompsSem5Screen;
