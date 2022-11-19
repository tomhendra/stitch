import styles from './Layout.module.css';
import { Children } from '~/types';
import Link from 'next/link';
import Image from 'next/image';

const channels = [
  { name: 'kent-c-dodds', id: 123 },
  { name: 'lee-robinson', id: 456 },
  { name: 'ryan-carniato', id: 789 },
];

function Layout({ children }: Children) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/images/stitch-dark.svg"
          height={28}
          width={28}
          alt="Stitch logo - credit of Vercel"
        />
      </header>
      <nav className={styles.sidebar}>
        <h2>Channels:</h2>
        {channels.map(channel => (
          <Link href={`/${channel.name}`} key={channel.id}>
            {channel.name}
          </Link>
        ))}
      </nav>
      <main className={styles.main}>
        {/* all routes will be rendered here */}
        {children}
      </main>
    </div>
  );
}

export { Layout };
