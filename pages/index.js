import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '../config/index';
import Link from 'next/link';

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await response.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
// export async function getServerSideProps(req, res) {
//   //radi kao node js na serveru gde mogu da se koriste req, res, next...
//   // server side funkcija svaki put fetch pravi kada smo na ovom url
//   const response = await fetch(`${API_URL}/api/events`);
//   const events = await response.json();
//   console.log(events);
//   return {
//     props: { events : events.slice(0, 3) },
//   };
// }
