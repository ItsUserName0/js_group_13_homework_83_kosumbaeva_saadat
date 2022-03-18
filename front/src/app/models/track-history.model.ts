export interface TrackHistory {
  _id: string,
  user: string,
  track: {_id: string, title: string},
  datetime: Date,
}

export interface TrackOfTrackHistory {
  track: string,
}

export interface TrackHistoryData {
  track: string,
  token: string,
}
