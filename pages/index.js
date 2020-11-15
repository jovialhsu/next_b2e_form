import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import { getSortedPostsData } from '../lib/posts';
import Form from '../components/Form';
export default function B2E_Form({ allPostsData }) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Form />
        </Layout>
    );
}
