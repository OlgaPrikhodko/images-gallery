import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">Images Gallery</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
