import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../../models/album.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { removeAlbumRequest } from '../../store/albums.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;

  apiUrl = environment.apiUrl;
  artistId!: string;
  toBeDeletedAlbum!: string;
  removingLoading: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.removingLoading = store.select(state => state.albums.removingLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistId = <string>params['id'];
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
}
