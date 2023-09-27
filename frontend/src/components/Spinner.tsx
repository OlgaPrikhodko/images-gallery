import { Spinner as Loader } from "react-bootstrap";

const spinnerStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(50%-1rem)",
  left: "calc(50%-1rem)",
};

const Spinner = () => {
  return <Loader animation="border" variant="primary" style={spinnerStyle} />;
};

export default Spinner;
