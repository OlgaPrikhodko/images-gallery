import { Button, Card, Nav } from "react-bootstrap";
import { ImageType } from "../types/types";

type ImageCardProps = {
  image: ImageType;
  deleteImage: (id: string) => void;
  saveImage: (id: string) => void;
};

const ImageCard = ({ image, deleteImage, saveImage }: ImageCardProps) => {
  const authorName = image.user?.name || "No author name";
  const authorPortfolioUrl = image.user?.portfolio_url;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>
          {image.description || image.alt_description || ""}
        </Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>{" "}
        {!image.saved && (
          <Button variant="secondary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
      <Card.Footer className="text-center text-muted">
        {authorPortfolioUrl ? (
          <Nav.Item>
            <Nav.Link href={authorPortfolioUrl} target="_blank">
              {authorName}
            </Nav.Link>
          </Nav.Item>
        ) : (
          <div>{authorName}</div>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
