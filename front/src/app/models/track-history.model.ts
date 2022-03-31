export interface TrackHistory {
  _id: string,
  user: string,
  track: {
    _id: string,
    title: string,
    album: {
      artist: { title: string }
    }
  },
  datetime: Date,
}

export interface TrackOfTrackHistory {
  track: string,
}
