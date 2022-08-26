import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import type { Location } from '/util/util';
import { capitalize } from '/util/util';

interface SearchSelectionsProps {
  selections: Location[];
  setSelections: Dispatch<SetStateAction<Location[]>>;
}

const items_per_page = 5;

export function SearchSelections({
  selections,
  setSelections,
}: SearchSelectionsProps) {
  const [page, setPage] = useState<number>(1);
  const prevRef = useRef<HTMLButtonElement>({} as HTMLButtonElement);
  const nextRef = useRef<HTMLButtonElement>({} as HTMLButtonElement);

  const total_pages = Math.ceil(selections.length / items_per_page);

  useEffect(() => {
    const p = prevRef.current;
    const n = nextRef.current;

    // the two following if else chains hide or show the prev/next buttons
    if (page === 1) p.classList.add('components__search-selection-btn--hide');
    else p.classList.remove('components__search-selection-btn--hide');

    if (total_pages === page || total_pages === 0)
      n.classList.add('components__search-selection-btn--hide');
    else n.classList.remove('components__search-selection-btn--hide');

    // this if chain sets the users page based on the active items
    if (total_pages === 0) setPage(1);
    else if (page > total_pages) setPage(page - 1);
  }, [total_pages, page]);

  return (
    <div className='components__search-selections'>
      <div
        className='components__search-selection-clear'
        onClick={(e) => {
          e.preventDefault();

          setSelections([]);
        }}
      >
        clear
      </div>
      <div className='components__search-selection-controls'>
        <button
          className='components__search-selection-btn'
          ref={prevRef}
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
        >
          prev
        </button>
        <div className='components__search-selection-btn'>
          {page} / {total_pages ? total_pages : 1}
        </div>
        <button
          className='components__search-selection-btn'
          ref={nextRef}
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={total_pages === page || total_pages === 0}
        >
          next
        </button>
      </div>
      {selections
        .map(({ city, state }, map_index) => (
          <div
            className='components__search-selection'
            key={map_index}
            onClick={(e) => {
              e.preventDefault();

              // using 'map_index' as the key allows us to filter by 'filter_index'
              setSelections(
                selections.filter(
                  (_, filter_index) => filter_index !== map_index
                )
              );
            }}
          >
            {capitalize(city) + ', ' + capitalize(state)}
          </div>
        ))
        .slice((page - 1) * items_per_page, page * items_per_page)}
    </div>
  );
}
