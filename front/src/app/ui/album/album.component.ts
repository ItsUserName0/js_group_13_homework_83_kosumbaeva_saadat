import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Album } from '../../models/album.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { publishAlbumRequest, removeAlbumRequest } from '../../store/albums.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit, OnDestroy {
  @Input() album!: Album;

  artistId!: string;

  removingLoading: Observable<boolean>;
  toBeDeletedAlbum!: string;

  publishLoading: Observable<boolean>;
  publishSub!: Subscription;
  toBePublishAlbumId = '';

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.removingLoading = store.select(state => state.albums.removingLoading);
    this.publishLoading = store.select(state => state.albums.publishLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistId = <string>params['id'];
    });

    this.publishSub = this.publishLoading.subscribe(isPublish => {
      if (!isPublish) {
        this.toBePublishAlbumId = '';
      }
    });
  }

  getDate() {
    const date = new Date(this.album.release);
    return date.getFullYear();
  }

  removeAlbum() {
    this.toBeDeletedAlbum = this.album._id;
    this.store.dispatch(removeAlbumRequest({albumId: this.album._id, artistId: this.artistId}));
  }

  publishAlbum() {
    this.toBePublishAlbumId = this.album._id;
    this.store.dispatch(publishAlbumRequest({albumId: this.album._id, artistId: this.artistId}));
  }

  ngOnDestroy(): void {
    this.publishSub.unsubscribe();
  }

}
