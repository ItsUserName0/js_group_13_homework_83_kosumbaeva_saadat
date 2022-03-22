import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist, ArtistData } from '../models/artist.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {

  constructor(private http: HttpClient) {
  }

  fetchArtists() {
    return this.http.get<Artist[]>(environment.apiUrl + '/artists');
  }

  createArtist(artistData: ArtistData) {
    const formData = new FormData();

    Object.keys(artistData).forEach(key => {
      if (artistData[key] !== null) {
        formData.append(key, artistData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/artists', formData);
  }

  removeArtist(artistId: string) {
    return this.http.delete(environment.apiUrl + '/artists/' + artistId);
  }

}
