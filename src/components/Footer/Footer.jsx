import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/images/logo192.png";
import "./Footer.css";
function Footer({ title, ...props }) {
  return (
    <div className="Footer">
      <Navbar bg="dark" variant="dark" fixed="bottom" className="custom-footer">
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
        <Nav.Item>
          <p className="text-right m-auto">
            Copyleft 2020 <span className="copyleft">&copy;</span>{" "}
          </p>
        </Nav.Item>
      </Navbar>
    </div>
  );
}

export default Footer;
