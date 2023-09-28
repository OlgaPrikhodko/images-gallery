import axios from "axios";
import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Saved images downloaded");
    } catch (error) {
      if (error instanceof Error)
        toast.error(error?.message || "Some problem with saving image");
      else console.log(error);
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
      toast.info(`New image '${term}' was founded`);
    } catch (error) {
      if (error instanceof Error)
        toast.error(error?.message || "Some problem with searching image.");
      else console.log(error);
    }
    setTerm("");
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        const deletedImage = images.find((image) => image.id === id);
        setImages(images.filter((image) => image.id !== id));
        toast.warning(`Image '${deletedImage?.title}' was deleted`);
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error?.message || "Some problem with deleting image");
      else console.log(error);
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
        toast.info(`New image ${imageToSave.title} was saved`);
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error?.message || "Some problem with saving image");
      else console.log(error);
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
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
