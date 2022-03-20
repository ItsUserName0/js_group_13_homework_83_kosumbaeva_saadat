import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrackHistory, TrackOfTrackHistory } from '../models/track-history.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackHistoryService {

  constructor(private http: HttpClient) {
  }

  getTrackHistory() {
    return this.http.get<TrackHistory[]>(environment.apiUrl + '/track_history');
  }

  addTrackToHistory(trackHistoryData: TrackOfTrackHistory) {
    return this.http.post(environment.apiUrl + '/track_history', {track: trackHistoryData.track});
  }

}
