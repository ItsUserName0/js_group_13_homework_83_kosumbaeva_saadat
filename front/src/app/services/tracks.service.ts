import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Track, TrackData } from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class TracksService {

  constructor(private http: HttpClient) {
  }

  getTracks(id?: string) {
    const url = id ? `/tracks?album=${id}` : '/tracks';
    return this.http.get<Track[]>(environment.apiUrl + url);
  }

  createTrack(trackData: TrackData) {
    return this.http.post(environment.apiUrl + '/tracks', trackData);
  }

  removeTrack(id: string) {
    return this.http.delete(environment.apiUrl + '/tracks/' + id);
  }

  publishTrack(id: string) {
    return this.http.post(`${environment.apiUrl}/tracks/${id}/publish`, {});
  }

}
