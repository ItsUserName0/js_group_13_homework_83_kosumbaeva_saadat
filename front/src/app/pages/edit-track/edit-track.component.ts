import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Album } from '../../models/album.model';
import { fetchAlbumsRequest } from '../../store/albums.actions';
import { createTrackRequest } from '../../store/tracks.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.sass']
})
export class EditTrackComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  albums: Observable<Album[]>;
  fetchAlbumsLoading: Observable<boolean>;
  createTrackLoading: Observable<boolean>;
  creatingError: Observable<null | string>;

  constructor(private store: Store<AppState>) {
  this.albums = store.select(state => state.albums.albums);
  this.fetchAlbumsLoading = store.select(state => state.albums.fetchAlbumsLoading);
  this.createTrackLoading = store.select(state => state.tracks.creatingLoading);
  this.creatingError = store.select(state => state.tracks.creatingError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAlbumsRequest({id: undefined}));
  }

  onSubmit() {
    this.store.dispatch(createTrackRequest({trackData: this.form.value}));
  }

}
