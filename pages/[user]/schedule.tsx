import { useRouter } from 'next/router';

function Schedule() {
  const router = useRouter();
  const { user } = router.query;

  return <p>Schedule for {user}</p>;
}

export default Schedule;
