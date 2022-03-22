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
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.artists = store.select(state => state.artists.artists);
    this.loading = store.select(state => state.albums.creatingLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistsRequest());
  }

  onSubmit() {
    const albumData = this.form.value;
    this.store.dispatch(createAlbumRequest({albumData}));
  }
}
