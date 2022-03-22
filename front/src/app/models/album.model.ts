export interface Album {
  _id: string,
  title: string,
  artist: {title: string},
  release: Date,
  image: string,
  is_published: boolean,
}

export interface AlbumData {
  [key: string]: any,

  title: string,
  artist: string,
  image: File | null,
}
