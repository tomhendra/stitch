import { useRouter } from 'next/router';

function About() {
  const router = useRouter();
  const { user } = router.query;

  return <p>About {user}</p>;
}

export default About;
