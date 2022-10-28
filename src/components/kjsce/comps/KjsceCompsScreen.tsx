import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const KjsceCompsScreen = (props: Props) => {
  return (
    <div>
      <h3>Choose Semester</h3>
      <ul>
        <li>
          <Link to="/kjsce/comps/sem5">Sem 5</Link>
        </li>
      </ul>
    </div>
  );
};

export default KjsceCompsScreen;
