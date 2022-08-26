import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { Locations } from '/util/util';

interface SearchBarProps {
  searchRef: MutableRefObject<HTMLInputElement>;
  optionsRef: MutableRefObject<HTMLDivElement>;
  locations: Locations;
  setSearch: Dispatch<SetStateAction<Locations>>;
}

export function SearchBar({
  searchRef,
  optionsRef,
  locations,
  setSearch,
}: SearchBarProps) {
  return (
    <input
      className='components__search-bar'
      ref={searchRef}
      placeholder='City or State'
      onChange={(e) => {
        e.preventDefault();

        // for QoL on input data
        // search ref current value
        const srv = searchRef.current.value.toLowerCase();
        // options ref current value
        const ocl = optionsRef.current.classList;

        const currentSearch = locations
          // filters inner results
          .filter(
            (location) =>
              // the two following filters grab either by city or by state
              // and ensure that no empty results are committed
              location.filter(({ city }) => city.startsWith(srv)).length > 0 ||
              location.filter(({ state }) => state.startsWith(srv)).length > 0
          )
          // filters outer results
          .map((location) =>
            location.filter(
              ({ state, city }) => city.startsWith(srv) || state.startsWith(srv)
            )
          );

        // dynamic results const; has data or is empty
        const results = srv.length > 0 ? currentSearch : [];

        // set search with results
        setSearch(results);

        // opens and closes based on results
        if (results.length > 0) {
          ocl.add('components__search-results--active');
        } else {
          ocl.remove('components__search-results--active');
        }
      }}
    />
  );
}
