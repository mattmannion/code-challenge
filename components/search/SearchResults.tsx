import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { Locations, Location } from '/util/util';
import { capitalize } from '/util/util';

interface SearchResults {
  searchRef: MutableRefObject<HTMLInputElement>;
  optionsRef: MutableRefObject<HTMLDivElement>;
  search: Locations;
  setSearch: Dispatch<SetStateAction<Locations>>;
  selections: Location[];
  setSelections: Dispatch<SetStateAction<Location[]>>;
}

export function SearchResults({
  searchRef,
  optionsRef,
  search,
  setSearch,
  selections,
  setSelections,
}: SearchResults) {
  return (
    <div className='components__search-results' ref={optionsRef}>
      {search.map((l) =>
        l.map(({ city, state }) => (
          <div
            className='components__search-result'
            key={city + state}
            onClick={(e) => {
              e.preventDefault();

              // prevents duplicate entries
              const sel = { city, state };
              const found = selections.find(
                ({ city, state }) => city === sel.city && state === sel.state
              );

              if (!found) setSelections((prev) => [...prev, sel]);

              // empties search on selection
              searchRef.current.value = '';
              setSearch([]);
            }}
          >
            {capitalize(city) + ', ' + capitalize(state)}
          </div>
        ))
      )}
    </div>
  );
}
