import { Container, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/logo.svg";

const navbarStyle: React.CSSProperties = {
  backgroundColor: "#eeeeee",
};

const Header = () => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo style={{ maxWidth: "12rem", maxHeight: "2rem" }} />
      </Container>
    </Navbar>
  );
};

export default Header;
