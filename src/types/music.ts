/**
 * 音楽メタデータ
 */
export type Metadata = {
  title: string;
  artist: string;
  album: string;
  albumArtists: string;
  genre: string;
  albumWork: string;
};

/**
 * 表示用音楽メタデータ
 */
export type DisplayMetadata = Pick<
  Metadata,
  "title" | "artist" | "albumWork"
> & {
  length: string;
};
