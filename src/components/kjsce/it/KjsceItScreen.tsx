import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const KjsceItScreen = (props: Props) => {
  return (
    <div>
      <h3>Choose Semester</h3>
      <ul>
        <li>
          <Link to="/kjsce/it/sem3">Sem 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default KjsceItScreen;
