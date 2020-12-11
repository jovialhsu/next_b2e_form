import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
const Layout = props => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="https://static.cdn-eztravel.com/assets/images/common/logo.jpg" />
                <meta name="description" content="企業會員申請加入服務" />
                <meta name="og:title" content={props.meta.title} />
                <title>{props.meta.title}</title>
            </Head>
            <Header />
            <main id="wrapper">{props.children}</main>
            <Footer />
        </>
    )
}
export default Layout
