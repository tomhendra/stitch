/* 
  The goal of this page will be to hit our API to get data that will allow 
  us to know the URLs of our dynamic pages.

  In a production app we would query a database for all of our user / channel 
  slugs and append them to our base URL.

  We can use the channel data from data/api.ts and pretend we have our first 
  12 users. ¡hay que empezar por algún sitio!

  TODO improve sitemap 
*/

import { GetServerSideProps } from 'next';
import { sampleChannelSearchQueryData } from '~/data/api';
import type { ChannelData } from '~/models/api';
import slugify from 'slugify';

const STITCH_APP_URL = 'https://stitch-delta.vercel.app';

function generateSiteMap(channels: ChannelData[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the URLs we know already-->
     <url>
       <loc>${STITCH_APP_URL}</loc>
     </url>
     <url>
     <loc>${STITCH_APP_URL}/about</loc>
     </url>
     ${channels
       .map(channel => {
         return `
       <url>
           <loc>${`${STITCH_APP_URL}/${slugify(
             channel.snippet.channelTitle,
           ).toLowerCase()}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

const SiteMap = () => {
  // getServerSideProps will do the heavy lifting
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  // const request = await fetch(EXTERNAL_DATA_URL);
  // const channels = await request.json();
  // ? our simulated data
  const channels = sampleChannelSearchQueryData.items;

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(channels);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
