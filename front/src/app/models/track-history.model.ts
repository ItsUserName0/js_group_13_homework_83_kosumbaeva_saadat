export interface TrackHistory {
  artist: string,
  trackHistory: {
    _id: string,
    user: string,
    track: {_id: string, title: string},
    datetime: Date,
  }
}

export interface TrackOfTrackHistory {
  track: string,
}
