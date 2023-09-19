import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Search from "./components/Search";
import Welcome from "./components/Welcome";

import { ImageType, UnsplashPhotoType } from "./types/types";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

function App() {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${API_URL}/new-image?query=${term}`)
      .then((res) => res.json())
      .then((data: UnsplashPhotoType) => {
        setImages([{ ...data, title: term }, ...images]);
        console.log(images);
      })
      .catch((err) => console.log(err));

    setTerm("");
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header />
      <Search term={term} setTerm={setTerm} handleSubmit={handleSearchSubmit} />

      {images.length ? (
        <Container className="mt-4">
          <Row xs={1} md={2} lg={3}>
            {images.map((image) => (
              <Col key={image.id} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;
