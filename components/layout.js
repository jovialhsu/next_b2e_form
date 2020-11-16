import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
const name = 'Cindy';
export const siteTitle = 'Next.js Website';
export default function Layout({ children, home }) {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content="Learn how to build a personal website using Next.js"
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.now.sh/${encodeURI(
                            siteTitle
                        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>

                <main id="wrapper">{children}</main>
            </div>
            <Footer />
        </>
    );
}
