import { sampleOne } from '~/utils/main';

const API = 'https://www.googleapis.com/youtube/v3';

/* 
  The YouTube Data API quota is 10K points per day, but every time we call the 
  list method it costs 100 pts - we get 100 calls per day.

  https://developers.google.com/youtube/v3/determine_quota_cost

  This seems like a lot but if we have 12 channel [slug] routes this soon gets 
  eaten up between builds on Vercel, development and route changes when testing 
  the app.

  My below solution is to use a random API key from o8 different apps created on
  Google Cloud Platform. This is a bit verbose, and there is a package to 
  interpolate env vars but it seems overkill fot this project. 
  
  https://www.npmjs.com/package/dotenv-expand
  
  If we install npm packages for every little workaround, our project will soon 
  balloon and we'd end up shipping too much JS to our users. Next.js is pretty 
  heavy out-of-the-box so we should be concious of performance wins like this.

  We should use this: https://bundlephobia.com/ 
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

type SearchOptions = {
  channelId?: string;
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
  regionCode?: 'ES' | 'EN'; // https://www.iso.org/obp/ui/#search/code/
  type?: 'video' | 'channel' | 'playlist';
  videoDefinition?: 'any' | 'high' | 'standard';
  videoEmbeddable?: 'any' | ' true';
  videoType?: 'any' | 'episode' | 'movie';
};

export function getYouTubeApiSearchEndpoint(
  query: string,
  options?: SearchOptions,
) {
  let url = `${API}/search?part=snippet&q=${query}`;

  if (options && options.maxResults && options.maxResults > 50) {
    throw new Error(
      `MaxResults can be no greater than 50. You have requested ${options.maxResults}`,
    );
  }

  if (options) {
    for (let property in options) {
      if (options.hasOwnProperty(property)) {
        const value = options[property as keyof typeof options];

        url += value ? `&${String(value)}` : '';
      }
    }
  }

  return `${url}&key=${auth}`;
}

export function getChannelVideosQueryEndpoint(
  channelId: string,
  maxResults: number,
) {
  const BASE = `${API}/search?order=date&part=snippet`;

  return `${BASE}&channelId=${channelId}&maxResults=${String(
    maxResults,
  )}&key=${auth}`;
}
