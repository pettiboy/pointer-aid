import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const KjsceItSem3Screen = (props: Props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/kjsce/it/sem3/calculator">Calculator</Link>
        </li>
      </ul>
    </div>
  );
};

export default KjsceItSem3Screen;
