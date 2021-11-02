import { Icons } from "../Icons/Icons";
import "./NavBar.css";

export function NavBar({backgroundColor}) {
  return (
    <nav className="nav-bar">
      <div  style={backgroundColor ? {background: "none", border: "none"} : {backgroundColor: "#fff"}}  className="nav-container">
        <div className="nav-content">
          <div className="nav-title">Instagram</div>
          <div className="input-section">
            <input placeholder="Search" type="text" className="nav-input" />
          </div>
          <div className="nav-icons">
            <Icons />
          </div>
        </div>
      </div>
    </nav>
  );
}