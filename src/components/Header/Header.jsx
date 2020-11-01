import { Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo192.png";
function Header({ title, ...props }) {
  return (
    <div className="Header">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          {title}
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Header;
