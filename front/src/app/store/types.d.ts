import { Artist } from '../models/artist.model';

export type ArtistsState = {
  artists: Artist[],
  fetchLoading: boolean,
  fetchError: null | string,
};

export type AppState = {
  artists: ArtistsState,
};
