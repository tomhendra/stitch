import { useRouter } from 'next/router';

function Videos() {
  const router = useRouter();
  const { user } = router.query;

  return <p>Videos for {user}</p>;
}

export default Videos;
