import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrackHistory, TrackHistoryData } from '../models/track-history.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackHistoryService {

  constructor(private http: HttpClient) {
  }

  getTrackHistory(token: string) {
    return this.http.get<TrackHistory[]>(environment.apiUrl + '/track_history', {headers: new HttpHeaders({'Authorization': token})});
  }

  addTrackToHistory(trackHistoryData: TrackHistoryData) {
    return this.http.post(environment.apiUrl + '/track_history', {track: trackHistoryData.track},
      {headers: new HttpHeaders({'Authorization': trackHistoryData.token})});
  }

}
