export class Album {
  constructor(public id: string, public title: string, public artist: { title: string }, public release: Date, public image: string) { }
}

export interface ApiAlbumData {
  _id: string,
  title: string,
  artist: {title: string},
  release: string,
  image: string,
}
