export type Channel = {
  channelId: string;
  title: string;
  about: string;
  thumbnail: string;
  videos?: Video[];
};

export type Video = {
  videoId: string;
  title: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
};

export type Message = {
  sender: string;
  body: string;
};
