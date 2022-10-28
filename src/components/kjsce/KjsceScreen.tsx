import { Link } from "react-router-dom";

type Props = {};

const KjsceScreen = (props: Props) => {
  return (
    <div>
      <h3>Choose Branch</h3>
      <ul>
        <li>
          <Link to="/kjsce/it">IT</Link>
        </li>
        <li>
          <Link to="/kjsce/comps">Comps</Link>
        </li>
      </ul>
    </div>
  );
};

export default KjsceScreen;
