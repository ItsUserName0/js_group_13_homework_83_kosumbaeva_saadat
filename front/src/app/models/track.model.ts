export interface Track {
  _id: string,
  title: string,
  duration: string,
  album?: string,
  is_published: boolean,
}

export interface TrackData {
  title: string,
  duration: string,
  album: null | string,
}
