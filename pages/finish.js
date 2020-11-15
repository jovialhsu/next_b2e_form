import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import { getSortedPostsData } from '../lib/posts';
import Notification from '../components/Notification';
export default function Form({ allPostsData }) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Notification />
        </Layout>
    );
}
