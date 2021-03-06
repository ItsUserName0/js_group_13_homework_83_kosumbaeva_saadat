import { Artist, ArtistCreatingError } from '../models/artist.model';
import { Album } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { Track } from '../models/track.model';
import { TrackHistory } from '../models/track-history.model';

export type ArtistsState = {
  artists: Artist[],
  fetchArtistLoading: boolean,
  creatingLoading: boolean,
  creatingError: null | ArtistCreatingError,
  removingLoading: boolean,
  publishLoading: boolean,
};

export type AlbumsState = {
  albums: Album[],
  fetchAlbumsLoading: boolean,
  creatingLoading: boolean,
  creatingError: null | string,
  removingLoading: boolean,
  publishLoading: boolean,
}

export type UsersState = {
  user: User | null,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoginLoading: boolean,
}

export type TracksState = {
  tracks: Track[],
  fetchLoading: boolean,
  creatingLoading: boolean,
  creatingError: null | string,
  removingLoading: boolean,
  publishLoading: boolean,
}

export type TrackHistoryState = {
  tracks: TrackHistory[],
  fetchLoading: boolean,
  addLoading: boolean,
}

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UsersState,
  tracks: TracksState,
  trackHistory: TrackHistoryState
};
