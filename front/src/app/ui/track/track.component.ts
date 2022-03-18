import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../models/track.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { addTrackToHistoryRequest } from '../../store/track-history.actions';
import { TrackOfTrackHistory } from '../../models/track-history.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.sass']
})
export class TrackComponent implements OnInit {
  @Input() track!: Track;
  @Input() index!: number;
  loading: Observable<boolean>;
  loadingSub!: Subscription;
  isAdding = false;
  addingTrackId = '';

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.trackHistory.addLoading);
  }

  ngOnInit(): void {
    this.loadingSub = this.loading.subscribe(isAdding => {
      this.isAdding = isAdding;
      if (!isAdding) {
        this.addingTrackId = '';
      }
    });
  }

  addtrackToHistory(id: string) {
    this.addingTrackId = id;
    const trackHistoryData: TrackOfTrackHistory = {
      track: this.track._id,
    };
    this.store.dispatch(addTrackToHistoryRequest({trackHistoryData}));
  }

}
