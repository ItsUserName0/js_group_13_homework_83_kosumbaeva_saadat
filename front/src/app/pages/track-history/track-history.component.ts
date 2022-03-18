import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { TrackHistory } from '../../models/track-history.model';
import { fetchTrackHistoryRequest } from '../../store/track-history.actions';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.sass']
})
export class TrackHistoryComponent implements OnInit, OnDestroy {
  tracks: Observable<TrackHistory[]>;
  loading: Observable<boolean>;
  user: Observable<null | User>;
  userSub!: Subscription;
  userData: User | null | undefined;

  constructor(private store: Store<AppState>, private router: Router) {
    this.tracks = store.select(state => state.trackHistory.tracks);
    this.loading = store.select(state => state.trackHistory.fetchLoading);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(userData => {
      this.userData = userData;
    });
    if (!this.userData) {
      void this.router.navigate(['/login']);
    }
    this.store.dispatch(fetchTrackHistoryRequest());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
