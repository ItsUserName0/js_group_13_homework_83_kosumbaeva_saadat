import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiArtistData, Artist } from '../models/artist.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {

  constructor(private http: HttpClient) {
  }

  fetchArtists() {
    return this.http.get<ApiArtistData[]>(environment.apiUrl + '/artists').pipe(
      map(response => {
        return response.map(artistData => {
          return new Artist(artistData._id, artistData.title, artistData.description, artistData.image);
        });
      })
    );
  }

}
