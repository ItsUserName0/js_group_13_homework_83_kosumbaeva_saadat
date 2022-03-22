import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album, AlbumData } from '../models/album.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) {
  }

  fetchAlbums(id: string) {
    return this.http.get<Album[]>(environment.apiUrl + '/albums' + '/?artist=' + id);
  }

  createAlbum(albumData: AlbumData) {
    const formData = new FormData();

    Object.keys(albumData).forEach(key => {
      if (albumData[key] !== null) {
        formData.append(key, albumData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/albums', formData);
  }

}
