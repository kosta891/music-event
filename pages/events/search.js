import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '../../config/index';

export default function Search({ events }) {
  const router = useRouter();
  return (
    <Layout title='Search Results'>
      <Link href='/events'>
        <a>Go back</a>
      </Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  console.log(term);
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const response = await fetch(`${API_URL}/events?${query}`);
  const events = await response.json();

  return {
    props: { events },
  };
}
