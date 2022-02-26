import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from '../../models/album.model';
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
  id = '';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.albums = this.store.select(state => state.artists.albums);
    this.loading = this.store.select(state => state.artists.fetchAlbumsLoading);
    this.error = this.store.select(state => state.artists.fetchAlbumsError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.store.dispatch(fetchAlbumsRequest({id: this.id}));
    })
  }

}
