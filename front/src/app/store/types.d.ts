import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';

export type ArtistsState = {
  artists: Artist[],
  fetchArtistLoading: boolean,
  fetchArtistError: null | string,
  albums: Album[],
  fetchAlbumsLoading: boolean,
  fetchAlbumsError: null | string,
};

export type AppState = {
  artists: ArtistsState,
};
