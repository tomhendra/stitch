import { sampleOne } from '~/utils/main';

const API = 'https://youtube.googleapis.com/youtube/v3';

/* 
  The YouTube Data API quota is 10K points per day, but every time we call the 
  list method it costs 100 pts - we get 100 calls per day.

  https://developers.google.com/youtube/v3/determine_quota_cost

  This seems like a lot but if we have 12 channel [slug] routes this soon gets 
  eaten up between builds on Vercel, development and route changes when testing 
  the app.

  My below solution is to use a random API key from 8 different apps created on
  Google Cloud Platform. This is a bit verbose, and a package does exists that 
  interpolates env vars, but it seems overkill fot this project. 
  
  https://www.npmjs.com/package/dotenv-expand
  
  If we install npm packages for every little workaround, our project will soon 
  balloon and we'd end up shipping too much JS to our users. Next.js is pretty 
  heavy out-of-the-box so we should be concious of performance wins like this.

  We should use keep an eye on package size: https://bundlephobia.com/ 
*/
const keys = [
  process.env.YOUTUBE_API_KEY_1,
  process.env.YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3,
  process.env.YOUTUBE_API_KEY_4,
  process.env.YOUTUBE_API_KEY_5,
  process.env.YOUTUBE_API_KEY_6,
  process.env.YOUTUBE_API_KEY_7,
  process.env.YOUTUBE_API_KEY_8,
];

const auth = sampleOne(keys);

/* 
  types guard us against a bad configuration of method calls to the google api. 
*/

type ChannelsOptions = {
  channelType?: 'any' | 'show';
  maxResults?: number;
  order?:
    | 'searchSortUnspecified'
    | 'date'
    | 'rating'
    | 'viewCount'
    | 'title'
    | 'videoCount'
    | 'relevance';
  q?: string;
  regionCode?: 'ES' | 'GB'; // https://www.iso.org/obp/ui/#search/code/
};

type VideoOptions = {
  channelId?: string;
  maxResults?: number;
  videoDefinition?: 'any' | 'high' | 'standard';
  videoEmbeddable?: 'any' | 'true';
  videoType?: 'any' | 'episode' | 'movie';
};
/* 
  be cautious when adding to this url builder, as not all methods are prepended 
  with &, for example location requires %2c to represent a comma between 
  latitude and longitude coords.
*/
function getYouTubeApiEndpoint(
  type: 'channel' | 'video' | 'playlist',
  options?: ChannelsOptions | VideoOptions,
) {
  let url = `${API}/search?part=snippet&type=${type}`;

  if (options) {
    const { maxResults } = options;

    if (maxResults && maxResults > 50) {
      throw new Error(
        `MaxResults can be no greater than 50. You have requested ${maxResults}`,
      );
    }

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const value = options[key as keyof typeof options];

        url += value ? `&${key}=${String(value)}` : '';
      }
    }
  }

  return `${url}&key=${auth}`;
}

export const getYouTubeChannelsEndpoint = (options: ChannelsOptions) =>
  getYouTubeApiEndpoint('channel', options);

export const getYouTubeVideosEndpoint = (options: VideoOptions) =>
  getYouTubeApiEndpoint('video', options);
