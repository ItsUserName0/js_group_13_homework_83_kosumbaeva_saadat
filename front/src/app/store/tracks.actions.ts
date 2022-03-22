import { createAction, props } from '@ngrx/store';
import { Track, TrackData } from '../models/track.model';

export const fetchTracksRequest = createAction('[Tracks] Fetch Request', props<{ albumId?: string }>());
export const fetchTracksSuccess = createAction('[Tracks] Fetch Success', props<{ tracks: Track[] }>());
export const fetchTracksFailure = createAction('[Tracks] Fetch Failure');

export const createTrackRequest = createAction('[Tracks] Create Request', props<{ trackData: TrackData }>());
export const createTrackSuccess = createAction('[Tracks] Create Success');
export const createTrackFailure = createAction('[Tracks] Create Failure', props<{ error: null | string }>());

export const removeTrackRequest = createAction('[Tracks] Remove Request', props<{ deletingId: string, albumId: string }>());
export const removeTrackSuccess = createAction('[Tracks] Remove Success');
export const removeTrackFailure = createAction('[Tracks] Remove Failure');
