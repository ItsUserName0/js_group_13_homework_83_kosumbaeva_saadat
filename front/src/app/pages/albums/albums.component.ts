import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from '../../models/album.model';
import { AppState } from '../../store/types';
import { fetchAlbumsRequest } from '../../store/albums.actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  albums: Observable<Album[]>;
  loading: Observable<boolean>
  artistChangeSubscription!: Subscription;
  artist = '';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.albums = this.store.select(state => state.albums.albums);
    this.loading = this.store.select(state => state.albums.fetchAlbumsLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = <string>params['id'];
      this.store.dispatch(fetchAlbumsRequest({id}));
    });
    this.artistChangeSubscription = this.albums.subscribe(albums => {
      if (albums[0]) {
        const album = albums[0];
        this.artist = album.artist.title;
      }
    });
  }

  ngOnDestroy(): void {
    this.artistChangeSubscription.unsubscribe();
  }

}
