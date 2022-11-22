import { AspectRatio } from '@chakra-ui/react';
import type { Video } from '~/models/app';

type Props = {
  video: Video | null;
};

function VideoPlayer({ video }: Props) {
  if (typeof video === null) {
    throw new Error('Video not found');
  }

  return (
    <AspectRatio maxW="560px" ratio={16 / 9} paddingBlock={6}>
      <iframe
        // src={`https://www.youtube.com/embed/${video?.videoId}`}
        src={`https://www.youtube.com/embed/${video?.videoId}?autoplay=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </AspectRatio>
  );
}

export { VideoPlayer };
