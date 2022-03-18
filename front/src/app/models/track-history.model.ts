export interface TrackHistory {
  _id: string,
  user: string,
  track: string,
  datetime: Date,
}

export interface TrackOfTrackHistory {
  track: string,
}

export interface TrackHistoryData {
  track: string,
  token: string,
}
