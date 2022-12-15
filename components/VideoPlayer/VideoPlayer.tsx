import { AspectRatio } from '@chakra-ui/react';
import type { Video } from '~/models/app';

type Props = {
  video: Video | null;
  autoplay: boolean;
};

function VideoPlayer({ video, autoplay }: Props) {
  if (typeof video === null) {
    throw new Error('Video not found');
  }

  return (
    <AspectRatio maxW="560px" ratio={16 / 9}>
      <iframe
        src={`https://www.youtube.com/embed/${video?.videoId}?autoplay=${
          autoplay ? 1 : 0
        }`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </AspectRatio>
  );
}

export { VideoPlayer };
