import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrackHistoryData } from '../models/track-history.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackHistoryService {

  constructor(private http: HttpClient) {
  }

  addTrackToHistory(trackHistoryData: TrackHistoryData) {
    return this.http.post(environment.apiUrl + '/track_history', {track: trackHistoryData.track},
      {headers: new HttpHeaders({'Authorization': trackHistoryData.token})});
  }

}
