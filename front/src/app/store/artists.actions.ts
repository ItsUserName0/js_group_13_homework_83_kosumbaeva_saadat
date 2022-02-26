import { createAction, props } from '@ngrx/store';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';

export const fetchArtistsRequest = createAction('[Artists] Fetch Request');
export const fetchArtistsSuccess = createAction('[Artists] Fetch Success', props<{ artists: Artist[] }>());
export const fetchArtistsFailure = createAction('[Artists] Fetch Failure', props<{ error: string }>());

export const fetchAlbumsRequest = createAction('[Albums] Fetch Request', props<{ id: string }>());
export const fetchAlbumsSuccess = createAction('[Albums] Fetch Success', props<{ albums: Album[] }>());
export const fetchAlbumsFailure = createAction('[Albums] Fetch Failure', props<{ error: string }>());
