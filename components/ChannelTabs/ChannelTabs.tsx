import {
  Box,
  Button,
  SimpleGrid,
  Tab,
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  TabPanels,
  Tabs as TabsPrimitive,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import type { Video } from '~/models/app';
import type { Children } from '~/types';

function Tabs({ children }: Children) {
  return <TabsPrimitive colorScheme="purple">{children}</TabsPrimitive>;
}

function TabList({ children }: Children) {
  return <TabListPrimitive fontWeight="bold">{children}</TabListPrimitive>;
}

function TabPanel({ children }: Children) {
  return <TabPanelPrimitive px={0}>{children}</TabPanelPrimitive>;
}

/*
  example usage...

  <Tabs>
    <TabList>
      <Tab>Videos</Tab>
      <Tab>About</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        Video tab content
      </TabPanel>
      <TabPanel>
        About tab content 
      </TabPanel>
    </TabPanels>
  </Tabs>
  
*/

// customised panels
type VideoTabPanelProps = {
  videos: Video[] | null;
  channelTitle: string;
  setCurrentVideo: Dispatch<SetStateAction<Video | null>>;
};

function VideoTabPanel({
  videos,
  channelTitle,
  setCurrentVideo,
}: VideoTabPanelProps) {
  return (
    <TabPanel>
      {videos?.length ? (
        <SimpleGrid
          columns={[1, 1, 2, 3, 4]}
          columnGap={[0, 0, 8]}
          rowGap={[8, 8, 8, 8]}
          w="full"
          h="full"
        >
          {videos?.map(video => {
            const { url } = video.thumbnails.medium;
            return (
              <Button
                variant="unstyled"
                key={video.videoId}
                onClick={() => setCurrentVideo(video)}
                w="full"
                h="full"
                overflow="hidden"
              >
                <Box
                  transition="transform 150ms"
                  _hover={{
                    transition: 'transform 250ms',
                    transform: 'scale(1.06)',
                  }}
                >
                  <Image alt={video.title} src={url} height={200} width={360} />
                  <VisuallyHidden>{video.title}</VisuallyHidden>
                </Box>
              </Button>
            );
          })}
        </SimpleGrid>
      ) : (
        <Text>
          {channelTitle ? `${channelTitle} ` : 'This channel '}
          has no uploaded videos.
        </Text>
      )}
    </TabPanel>
  );
}

type AboutTabPanelProps = {
  about: string;
};

function AboutTabPanel({ about }: AboutTabPanelProps) {
  return (
    <TabPanel>
      <Text>
        {about ? about : 'No information has been provided about this channel.'}
      </Text>
    </TabPanel>
  );
}

export {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VideoTabPanel,
  AboutTabPanel,
};
