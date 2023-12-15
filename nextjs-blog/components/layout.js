// import libraries
import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';


const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

//creating the layout for the login page
//using the children to display the content
export default function LayoutLogin({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
     
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}