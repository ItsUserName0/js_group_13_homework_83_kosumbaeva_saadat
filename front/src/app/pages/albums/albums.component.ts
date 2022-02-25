import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../../models/album.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchAlbumsRequest } from '../../store/artists.actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {
  albums: Observable<Album[]>;
  loading: Observable<boolean>
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.albums = this.store.select(state => state.artists.albums);
    this.loading = this.store.select(state => state.artists.fetchAlbumsLoading);
    this.error = this.store.select(state => state.artists.fetchAlbumsError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAlbumsRequest());
  }

}
