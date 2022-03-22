import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { createAlbumRequest } from '../../store/albums.actions';
import { fetchArtistsRequest } from '../../store/artists.actions';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.sass']
})
export class EditAlbumComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  artists: Observable<Artist[]>;
  artistsFetchLoading: Observable<boolean>;
  creatingLoading: Observable<boolean>;
  creatingError: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.artists = store.select(state => state.artists.artists);
    this.artistsFetchLoading = store.select(state => state.artists.fetchArtistLoading);
    this.creatingLoading = store.select(state => state.albums.creatingLoading);
    this.creatingError = store.select(state => state.albums.creatingError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistsRequest());
  }

  onSubmit() {
    this.store.dispatch(createAlbumRequest({albumData: this.form.value}));
  }

}
