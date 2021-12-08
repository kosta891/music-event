import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Showcase from './Showcase';

const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();
  return (
    <div className='global-wrapper'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}> {children}</div>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: 'DJ Events | Find hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, events',
};
export default Layout;
