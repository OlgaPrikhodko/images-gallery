import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import Welcome from "./components/Welcome";

import { ImageType, UnsplashPhotoType } from "./types/types";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

function App() {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get<ImageType[]>(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.get<UnsplashPhotoType>(
        `${API_URL}/new-image?query=${term}`,
      );
      setImages([{ ...res.data, title: term }, ...images]);
    } catch (error) {
      console.log(error);
    }
    setTerm("");
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id: string) => {
    const imageToSave = images.find((image) => image.id === id);

    if (!imageToSave) return;

    imageToSave.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToSave);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            term={term}
            setTerm={setTerm}
            handleSubmit={handleSearchSubmit}
          />

          {images.length ? (
            <Container className="mt-4">
              <Row xs={1} md={2} lg={3}>
                {images.map((image) => (
                  <Col key={image.id} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            <Welcome />
          )}
        </>
      )}
    </div>
  );
}

export default App;
