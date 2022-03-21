export interface Album {
  _id: string,
  title: string,
  artist: {title: string},
  release: Date,
  image: string,
  is_published: boolean,
}
