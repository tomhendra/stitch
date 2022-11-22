import { sampleOne } from '~/utils/main';

type ResourceType = 'video' | 'channel' | 'playlist';

const API = 'https://www.googleapis.com/youtube/v3';
const AUTH = process.env.YOUTUBE_API_KEY_5;

// ? Function names should correspond to the YouTube API conventions por-fa

export function getChannelSearchQueryEndpoint(
  maxResults: number,
  search: string,
  type: ResourceType,
) {
  const BASE = `${API}/search?part=snippet`;

  return `${BASE}&maxResults=${maxResults}&q=${search}&type=${type}&key=${AUTH}`;
}

export function getChannelVideosQueryEndpoint(
  channelId: string,
  maxResults: number,
) {
  const BASE = `${API}/search?order=date&part=snippet`;

  return `${BASE}&channelId=${channelId}&maxResults=${maxResults}&key=${AUTH}`;
}

export function getPlaylistEndpoint(id: string, maxResults: number) {
  const BASE = `${API}/playlists?part=snippet%2CcontentDetails`;

  return `${BASE}&channelId=${id}&maxResults=${maxResults}&key=${AUTH}`;
}

export function getChannelsEndpoint(id: string) {
  const BASE = `${API}/channels?part=snippet%2CcontentDetails`;

  return `${BASE}%2Cstatistics&id=${id}&key=${AUTH}`;
}
