import type { Locations, Location } from '/util/util';
import { useRef, useState } from 'react';
import { SearchBar } from '/components/search/SearchBar';
import { SearchResults } from '/components/search/SearchResults';
import { SearchSelections } from '/components/search/SearchSelections';

interface HomeProps {
  locations: Locations;
}

export function Home({ locations }: HomeProps) {
  const [search, setSearch] = useState<Locations>([]);
  const [selections, setSelections] = useState<Location[]>([]);

  const searchRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const optionsRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  return (
    <div
      className='home'
      // this give the search results box a modal feel
      // clicking outside of the box will close it
      onClick={(e) => {
        e.preventDefault();

        searchRef.current.value = '';
        setSearch([]);
      }}
    >
      <SearchBar
        locations={locations}
        optionsRef={optionsRef}
        searchRef={searchRef}
        setSearch={setSearch}
      />

      <SearchResults
        searchRef={searchRef}
        optionsRef={optionsRef}
        search={search}
        setSearch={setSearch}
        selections={selections}
        setSelections={setSelections}
      />

      <SearchSelections selections={selections} setSelections={setSelections} />
    </div>
  );
}
