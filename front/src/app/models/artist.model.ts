export class Artist {
  constructor(public id: string, public title: string, public description: string, public image: string) {
  }
}

export interface ApiArtistData {
  _id: string,
  title: string,
  description: string,
  image: string
}
