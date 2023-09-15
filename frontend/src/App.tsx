import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Search from "./components/Search";

import { ImageType, UnsplashPhotoType } from "./types/types";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random/?query=${term}&client_id=${UNSPLASH_KEY}`,
    )
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

      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image) => (
            <Col key={image.id} className="pb-3">
              <ImageCard image={image} deleteImage={handleDeleteImage} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
