import { getYouTubeChannelsEndpoint } from '~/helpers/youtube-api.helper';

describe('getYouTubeChannelsEndpoint', () => {
  test('generates a valid endpoint', () => {
    const endpoint = getYouTubeChannelsEndpoint({
      maxResults: 8,
      order: 'date',
      q: 'gaming',
    });
    const result = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=8&order=date&q=gaming&key=${process.env.YOUTUBE_API_KEY}`;
    expect(endpoint).toBe(result);
  });
});
