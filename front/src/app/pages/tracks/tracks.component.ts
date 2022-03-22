import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';
import { fetchTracksRequest } from '../../store/tracks.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit {
  tracks: Observable<Track[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.loading = store.select(state => state.tracks.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const albumId = <string>params['id'];
      this.store.dispatch(fetchTracksRequest({albumId}));
    })
  }

}
