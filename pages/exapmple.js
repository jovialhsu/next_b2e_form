import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
// import { getSortedPostsData } from '../lib/posts';

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like
                    this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>
                    .)
                </p>
            </section>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    <li>5</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </section>
        </Layout>
    );
}

// export async function getStaticProps() {
//     const allPostsData = getSortedPostsData();
//     return {
//         props: {
//             allPostsData,
//         },
//     };
// }
// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..');
//     return res.json();
// }
