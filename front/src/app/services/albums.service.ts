import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/album.model';
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
}
