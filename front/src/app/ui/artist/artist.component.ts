import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { removeArtistRequest } from '../../store/artists.actions';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.sass']
})
export class ArtistComponent implements OnInit {
  @Input() artist!: Artist;

  removingLoading: Observable<boolean>;
  toBeDeletedArtist = '';

  constructor(private store: Store<AppState>) {
    this.removingLoading = store.select(state => state.artists.removingLoading);
  }

  ngOnInit(): void {
  }

  removeArtist() {
    this.toBeDeletedArtist = this.artist._id;
    this.store.dispatch(removeArtistRequest({artistId: this.artist._id}));
  }
}
