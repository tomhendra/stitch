export type ChannelDataFromApi = {
  etag: string;
  id: {
    channelId: string;
    kind: string;
  };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    title: string;
  };
};

export type ChannelList = {
  channelId: string;
  title: string;
};

export type Video = {
  videoId: string;
  title: string;
};

export type Channel = {
  channelId: string;
  title: string;
  about: string;
  videos: Video[];
};

export type Message = {
  sender: string;
  body: string;
};
