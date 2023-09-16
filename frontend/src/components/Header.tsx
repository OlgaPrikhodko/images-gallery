import { Container, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/logo.svg";

const navbarStyle: React.CSSProperties = {
  backgroundColor: "#eeeeee",
};

const Header = () => {
  return (
    <Navbar style={navbarStyle} variant="light" className="shadow-sm py-3">
      <Container>
        <Logo
          style={{ maxWidth: "12rem", maxHeight: "2rem" }}
          title="Images Gallery"
        />
      </Container>
    </Navbar>
  );
};

export default Header;
