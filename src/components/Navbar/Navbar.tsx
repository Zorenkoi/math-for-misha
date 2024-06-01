import SwitchTheme from "../SwitchTheme/SwitchTheme";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-body">
          <Link className="navbar-link" to="/">
            Рівні
          </Link>

          <SwitchTheme />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
