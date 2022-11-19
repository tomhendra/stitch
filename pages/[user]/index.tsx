import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

function User() {
  const router = useRouter();
  const { user } = router.query;

  return (
    <>
      <Head>
        <title>User channel</title>
        <meta name="description" content="User description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Slug: {user}</h1>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href="/">Go home</Link>
        <Link href={`/${user}/about`}>About</Link>
        <Link href={`/${user}/videos`}>Videos</Link>
        <Link href={`/${user}/schedule`}>Schedule</Link>
        <Link href={`/${user}/chat`}>Chat</Link>
      </nav>
    </>
  );
}

export default User;
