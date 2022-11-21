export type Channel = {
  channelId: string;
  title: string;
  about: string;
  videos?: Video[];
};

export type Video = {
  videoId: string;
  title: string;
};

export type Message = {
  sender: string;
  body: string;
};
