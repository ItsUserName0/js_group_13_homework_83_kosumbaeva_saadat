import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { TrackHistory } from '../../models/track-history.model';
import { fetchTrackHistoryRequest } from '../../store/track-history.actions';

@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.sass']
})
export class TrackHistoryComponent implements OnInit {
  tracks: Observable<TrackHistory[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.tracks = store.select(state => state.trackHistory.tracks);
    this.loading = store.select(state => state.trackHistory.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTrackHistoryRequest());
  }

}
