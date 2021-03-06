import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Artist } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { publishArtistRequest, removeArtistRequest } from '../../store/artists.actions';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.sass']
})
export class ArtistComponent implements OnInit, OnDestroy {
  @Input() artist!: Artist;

  removingLoading: Observable<boolean>;
  toBeDeletedArtist = '';

  publishLoading: Observable<boolean>;
  publishSub!: Subscription;
  toBePublishArtistId = '';

  constructor(private store: Store<AppState>) {
    this.removingLoading = store.select(state => state.artists.removingLoading);
    this.publishLoading = store.select(state => state.artists.publishLoading);
  }

  ngOnInit(): void {
    this.publishSub = this.publishLoading.subscribe(isPublish => {
      if (!isPublish) {
        this.toBePublishArtistId = '';
      }
    })
  }

  removeArtist() {
    this.toBeDeletedArtist = this.artist._id;
    this.store.dispatch(removeArtistRequest({artistId: this.artist._id}));
  }

  publishArtist() {
    this.toBePublishArtistId = this.artist._id;
    this.store.dispatch(publishArtistRequest({id: this.artist._id}));
  }

  ngOnDestroy(): void {
    this.publishSub.unsubscribe();
  }

}
