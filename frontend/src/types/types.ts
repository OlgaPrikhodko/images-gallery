export type UnsplashPhotoType = {
  id: string;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
  description: string | null;
  alt_description: string;
  saved: boolean;
};

export type ImageType = UnsplashPhotoType & {
  title: string;
};
