import { createAction, props } from '@ngrx/store';
import { Artist, ArtistData, ArtistCreatingError } from '../models/artist.model';

export const fetchArtistsRequest = createAction('[Artists] Fetch Request');
export const fetchArtistsSuccess = createAction('[Artists] Fetch Success', props<{ artists: Artist[] }>());
export const fetchArtistsFailure = createAction('[Artists] Fetch Failure');

export const createArtistRequest = createAction('[Artists] Create Request', props<{ artistData: ArtistData }>());
export const createArtistSuccess = createAction('[Artists] Create Success');
export const createArtistFailure = createAction('[Artists] Create Failure', props<{ error: null | ArtistCreatingError }>());

export const removeArtistRequest = createAction('[Artists] Remove Request', props<{ artistId: string }>());
export const removeArtistSuccess = createAction('[Artists] Remove Success');
export const removeArtistFailure = createAction('[Artists] Remove Failure');

export const publishArtistRequest = createAction('[Artists] Publish Request', props<{ id: string }>());
export const publishArtistSuccess = createAction('[Artists] Publish Success');
export const publishArtistFailure = createAction('[Artists] Publish Failure');
