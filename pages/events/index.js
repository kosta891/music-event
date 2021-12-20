import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '../../config/index';
import Link from 'next/link';

export default function Events({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${API_URL}/events?_sort=date:ASC`);
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
//     props: { events },
//   };
// }
