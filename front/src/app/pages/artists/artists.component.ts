import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchArtistsRequest } from '../../store/artists.actions';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.sass']
})
export class ArtistsComponent implements OnInit {
  artists: Observable<Artist[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.artists = this.store.select(state => state.artists.artists);
    this.loading = this.store.select(state => state.artists.fetchArtistLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistsRequest());
  }

}
