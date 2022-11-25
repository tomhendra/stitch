import { sampleOne } from '~/utils/main';
/* 
  The YouTube Data API quota is 10K points per day, but every time we call the 
  list method it costs 100 pts - we get 100 calls per day.

  https://developers.google.com/youtube/v3/determine_quota_cost

  This seems like a lot but if we have 12 channel [slug] routes this soon gets 
  eaten up between builds on Vercel, development and route changes when testing 
  the app.

  My solution is to use a random API key from 8 different apps created on
  Google Cloud Platform. This is a bit verbose, and a package does exists that 
  interpolates env vars, but it seems overkill fot this project. 
  
  https://www.npmjs.com/package/dotenv-expand
  
  If we install npm packages for every little workaround, our project will soon 
  balloon and we'd end up shipping too much JS to our users. Next.js is pretty 
  heavy out-of-the-box so we should be concious of performance wins like this.

  We should use keep an eye on package size: https://bundlephobia.com/ 
*/
const API = 'https://youtube.googleapis.com/youtube/v3';

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

function getEndpointGenerator() {
  const auth = sampleOne(keys);
  /* 
    be cautious when adding options to the url generator, as not all methods 
    are prepended with &. for example location requires %2c to represent a 
    comma in between latitude and longitude values.
  */
  function generateEndpointUrl(
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

  return generateEndpointUrl;
  /* 
    The returned function generateEndpointUrl has closure over the auth variable. 
    This is a contrived example since the generated endpoint appends the api key 
    to the end of the URL for the whole world to see. However if this was an 
    auth token for authorization to perform CRUD operations on a database, it 
    would be a wise pattern to follow as not expose sensitive data and being 
    vulnerable to bad actor attacks. 

    Here it servers two purposes:

    1. To demonstrate that Tom understands how closures work in JavaScript.
    2. A placeholder for when this app grows! 
  */
}

/* 
  The type property defines which API methods are compatible with each other.
  We use TypeScript to prevent incorrect configuration and failed API requests.
*/
export function getYouTubeChannelsEndpoint(options: ChannelsOptions) {
  const generateEndpointUrl = getEndpointGenerator();
  return generateEndpointUrl('channel', options);
}

export function getYouTubeVideosEndpoint(options: VideoOptions) {
  const generateEndpointUrl = getEndpointGenerator();
  return generateEndpointUrl('video', options);
}
