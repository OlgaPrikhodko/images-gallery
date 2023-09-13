import { Container, Navbar } from "react-bootstrap";

const navbarStyle: React.CSSProperties = {
  backgroundColor: "lightblue",
};

const Header = () => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Navbar.Brand href="/">Images Gallery</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
