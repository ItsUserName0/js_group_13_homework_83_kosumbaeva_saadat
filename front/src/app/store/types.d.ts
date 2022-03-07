import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { RegisterError, User } from '../models/user.model';

export type ArtistsState = {
  artists: Artist[],
  fetchArtistLoading: boolean,
  fetchArtistError: null | string,
};

export type AlbumsState = {
  albums: Album[],
  fetchAlbumsLoading: boolean,
  fetchAlbumsError: null | string,
}

export type UsersState = {
  user: User | null,
  registerLoading: boolean,
  registerError: null | RegisterError,
}

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UsersState,
};
