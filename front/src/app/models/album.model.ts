export class Album {
  constructor(public id: string, public title: string, public artist: string, public release: Date, public image: string) { }
}

export interface ApiAlbumData {
  _id: string,
  title: string,
  artist: string,
  release: string,
  image: string,
}
