import { createAction, props } from '@ngrx/store';
import { Album } from '../models/album.model';

export const fetchAlbumsRequest = createAction('[Albums] Fetch Request', props<{ id: string }>());
export const fetchAlbumsSuccess = createAction('[Albums] Fetch Success', props<{ albums: Album[] }>());
export const fetchAlbumsFailure = createAction('[Albums] Fetch Failure');
