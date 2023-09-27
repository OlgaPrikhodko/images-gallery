const imageUrls = ["large", "regular", "raw", "small", "small_s3"] as const;

type ImageUrlType = { [key in (typeof imageUrls)[number]]: string };

export type UnsplashPhotoType = {
  id: string;
  width: number;
  height: number;
  urls: ImageUrlType;
  color: string | null;
  user: {
    username: string;
    name: string;
    portfolio_url: string | null;
  };
  description: string | null;
  alt_description: string;
  saved: boolean;
};

export type ImageType = UnsplashPhotoType & {
  title: string;
};
