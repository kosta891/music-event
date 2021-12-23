import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL, PER_PAGE } from '../../config/index';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

export default function Events({ events, total, page }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const response = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await response.json();

  const responseCount = await fetch(`${API_URL}/events/count`);
  const total = await responseCount.json();
  console.log(total);

  return {
    props: { events, page: +page, total },
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
