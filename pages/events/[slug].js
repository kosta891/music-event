import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MyEvent = ({ event }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
        <span>
          {new Date(event.date).toLocaleDateString('sr-rs', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}{' '}
          at {event.time}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />
        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href='/events'>
          <a className={styles.back}> {'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default MyEvent;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();
  const paths = events.map((event) => ({
    params: {
      slug: event.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      event: events[0],
      revalidate: 1,
    },
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       event: events[0],
//     },
//   };
// }
