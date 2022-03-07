import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album, ApiAlbumData } from '../models/album.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) {
  }

  fetchAlbums(id: string) {
    return this.http.get<ApiAlbumData[]>(environment.apiUrl + '/albums' + '/?artist=' + id).pipe(
      map(response => {
        return response.map(albumData => {
          return new Album(albumData._id, albumData.title, albumData.artist, new Date(albumData.release), albumData.image);
        });
      })
    );
  }
}
