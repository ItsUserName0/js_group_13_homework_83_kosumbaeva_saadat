import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { Track } from '../models/track.model';

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
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type TracksState = {
  tracks: Track[],
  fetchLoading: boolean,
}

export type TrackHistoryState = {
  addLoading: boolean,
}

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UsersState,
  tracks: TracksState,
  trackHistory: TrackHistoryState
};
