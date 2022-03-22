import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { createArtistRequest } from '../../store/artists.actions';
import { ArtistCreatingError } from '../../models/artist.model';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.sass']
})
export class EditArtistComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  loading: Observable<boolean>;
  error: Observable<null | ArtistCreatingError>;
  errSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.artists.creatingLoading);
    this.error = store.select(state => state.artists.creatingError);
  }

  ngAfterViewInit(): void {
    this.errSub = this.error.subscribe(error => {
      if (error) {
        const msg = error.errors.title.message;
        this.form.form.get('title')?.setErrors({titleServerError: msg});
      } else {
        this.form.form.get('title')?.setErrors(null);
      }
    })
  }

  onSubmit() {
    this.store.dispatch(createArtistRequest({artistData: this.form.value}));
  }

  ngOnDestroy(): void {
    this.errSub.unsubscribe();
  }

}
