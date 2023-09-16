import { Button } from "react-bootstrap";

const Welcome = () => {
  return (
    <div className="hero p-5 mt-4 mx-4 border rounded">
      <h4 className="mb-4">Images Gallery</h4>
      <p className="mb-5">
        This is a simple application that retrieves photos using{" "}
        <strong>Unsplash API</strong>.<br /> In order to start enter any search
        term in the input field like <em>&quot;car&quot;</em> or{" "}
        <em>&quot;flower&quot;</em>.
      </p>
      <Button
        variant="outline-primary"
        href="https://unsplash.com"
        target="_blank"
        className="mb-4"
      >
        Learn more
      </Button>
    </div>
  );
};

export default Welcome;
