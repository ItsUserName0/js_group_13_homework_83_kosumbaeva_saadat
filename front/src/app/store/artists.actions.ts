import { createAction, props } from '@ngrx/store';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';

export const fetchArtistsRequest = createAction('[Artists] Fetch Request');
export const fetchArtistsSuccess = createAction('[Artists] Fetch Success', props<{artists: Artist[]}>());
export const fetchArtistsFailure = createAction('[Artists] Fetch Failure', props<{error: string}>());

export const fetchAlbumsRequest = createAction('[Artists] Fetch Request');
export const fetchAlbumsSuccess = createAction('[Artists] Fetch Success', props<{albums: Album[]}>());
export const fetchAlbumsFailure = createAction('[Artists] Fetch Failure', props<{error: string}>());
