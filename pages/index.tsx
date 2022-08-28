import type { GetServerSideProps } from 'next';
import type { Locations } from '/util/util';
import { Home } from '/app/home/Home';
import { FetchLocations } from '/util/util';

interface HomePageProps {
  locations: Locations;
}

export default function HomePage({ locations }: HomePageProps) {
  console.log(locations);
  return (
    <div>
      <Home locations={locations} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { locations: FetchLocations() } };
};
