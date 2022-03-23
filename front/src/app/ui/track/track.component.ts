import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../models/track.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { addTrackToHistoryRequest } from '../../store/track-history.actions';
import { TrackOfTrackHistory } from '../../models/track-history.model';
import { Observable, Subscription } from 'rxjs';
import { publishTrackRequest, removeTrackRequest } from '../../store/tracks.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.sass']
})
export class TrackComponent implements OnInit {
  @Input() track!: Track;
  @Input() index!: number;
  album!: string;

  loading: Observable<boolean>;
  loadingSub!: Subscription;
  addingTrackId = '';
  removingLoading: Observable<boolean>;
  toBeDeletedTrackId = '';
  publishLoading: Observable<boolean>;
  toBePublishTrackId = '';
  publishSub!: Subscription;
  isPublish = false;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.loading = store.select(state => state.trackHistory.addLoading);
    this.removingLoading = store.select(state => state.tracks.removingLoading);
    this.publishLoading = store.select(state => state.tracks.publishLoading);
  }

  ngOnInit(): void {
    this.loadingSub = this.loading.subscribe(isAdding => {
      if (!isAdding) {
        this.addingTrackId = '';
      }
    });

    this.publishSub = this.publishLoading.subscribe(isPublish => {
      this.isPublish = isPublish;
      if (!isPublish) {
        this.toBePublishTrackId = '';
      }
    });

    this.route.params.subscribe(params => {
      this.album = <string>params['id'];
    })
  }

  addtrackToHistory() {
    this.addingTrackId = this.track._id;
    const trackHistoryData: TrackOfTrackHistory = {
      track: this.track._id,
    };
    this.store.dispatch(addTrackToHistoryRequest({trackHistoryData}));
  }

  removeTrack() {
    this.toBeDeletedTrackId = this.track._id;
    this.store.dispatch(removeTrackRequest({deletingId: this.track._id, albumId: this.album}));
  }

  publishTrack() {
    this.toBePublishTrackId = this.track._id;
    this.store.dispatch(publishTrackRequest({trackId: this.track._id, albumId: this.album}));
  }
}
