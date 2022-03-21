export interface Artist {
  _id: string,
  title: string,
  description: string,
  image: string,
  is_published: boolean,
}

export interface ArtistData {
  [key: string]: any,

  title: string,
  description: null | string,
  image: File | null,
}
