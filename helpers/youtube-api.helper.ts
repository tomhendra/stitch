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
  const API = 'https://youtube.googleapis.com/youtube/v3';
  const AUTH = process.env.YOUTUBE_API_KEY;
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

    return `${url}&key=${AUTH}`;
  }

  return generateEndpointUrl;
  /* 
    The returned function generateEndpointUrl has closure over the AUTH variable. 
    This is a contrived example since the generated endpoint appends the api key 
    to the end of the URL for the whole world to see. However if this was an 
    authorization token to perform CRUD operations on a database, it would be a 
    wise pattern to follow as not expose sensitive data and leave the app 
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
