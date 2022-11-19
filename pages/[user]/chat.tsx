import { useRouter } from 'next/router';

function Chat() {
  const router = useRouter();
  const { user } = router.query;

  return <p>Chat for {user}</p>;
}

export default Chat;
