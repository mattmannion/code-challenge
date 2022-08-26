import cities_json from '/data/cities.json';

export interface ParseLocation {
  state: string;
  cities: string[];
}

export interface Location {
  state: string;
  city: string;
}

export type Locations = Location[][];

/**
 * Fetches cities.json data.
 *
 * All processing needed including sorting
 * and transforming are handled and served here
 */
export function FetchLocations(): Locations {
  return cities_json
    .sort((a, b) => a.state.localeCompare(b.state))
    .map(({ state, cities }) =>
      cities.sort().map((city) => ({
        state: state.toLowerCase(),
        city: city.toLowerCase(),
      }))
    )
    .map((cities) => cities.sort((a, b) => a.city.localeCompare(b.city)));
}

/**
 * Capitalizes first letter of each word in a string
 */
export function capitalize(s: string) {
  return s
    .split(' ')
    .map((m) => m[0].toUpperCase() + m.slice(1))
    .join(' ');
}
