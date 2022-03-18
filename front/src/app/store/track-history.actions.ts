import { createAction, props } from '@ngrx/store';
import { TrackOfTrackHistory } from '../models/track-history.model';

export const addTrackToHistoryRequest = createAction('[TrackHistory] Add Request', props<{ trackHistoryData: TrackOfTrackHistory }>());
export const addTrackToHistorySuccess = createAction('[TrackHistory] Add Success');
export const addTrackToHistoryFailure = createAction('[TrackHistory] Add Failure');
