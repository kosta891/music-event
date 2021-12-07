import Head from 'next/head';
import styles from '../styles/Layout.module.css';

const Layout = ({ title, keywords, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <div className={styles.container}> {children}</div>
    </>
  );
};
Layout.defaultProps = {
  title: 'DJ Events | Find hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, events',
};
export default Layout;
