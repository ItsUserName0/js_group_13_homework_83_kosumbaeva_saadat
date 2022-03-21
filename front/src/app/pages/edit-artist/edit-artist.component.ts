import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { createArtistRequest } from '../../store/artists.actions';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.sass']
})
export class EditArtistComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.artists.createLoading);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const artistData = this.form.value;
    this.store.dispatch(createArtistRequest({artistData}));
  }
}
