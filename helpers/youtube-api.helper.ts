type ResourceType = 'video' | 'channel' | 'playlist';

const API = 'https://www.googleapis.com/youtube/v3';
const AUTH = process.env.YOUTUBE_API_KEY_2;

// ? Function names should correspond to the YouTube API conventions por-fa

export function getSearchEndpoint(
  maxResults: number,
  search: string,
  type: ResourceType,
) {
  // 'https://youtube.googleapis.com/youtube/v3/search?part=snippet
  // &maxResults=25&
  // q=surfing
  // &type=channel
  // &key=[YOUR_API_KEY]';
  const BASE = `${API}/search?part=snippet`;
  return `${BASE}&maxResults=${maxResults}&q=${search}&type=${type}&key=${AUTH}`;
}

export function getPlaylistEndpoint(id: string, maxResults: number) {
  // 'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails
  // &channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw
  // &maxResults=25
  // &key=[YOUR_API_KEY]'

  const BASE = `${API}/playlists?part=snippet%2CcontentDetails`;
  return `${BASE}&channelId=${id}&maxResults=${maxResults}&key=${AUTH}`;
}

export function getChannelsEndpoint(id: string) {
  // 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails
  //  %2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw
  //  &key=[YOUR_API_KEY]'
  const BASE = `${API}/channels?part=snippet%2CcontentDetails`;
  return `${BASE}%2Cstatistics&id=${id}&key=${AUTH}`;
}
