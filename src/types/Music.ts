/**
 * 音楽メタデータ用型定義
 */

/**
 * 音楽メタデータ
 */
export type Metadata = {
  artist: string;
  title: string;
  artists: string;
  album: string;
  albumArtists: string;
  genre: string;
};

/**
 * 表示用音楽メタデータ
 */
export type DisplayMetadata = Pick<Metadata, "title" | "artist"> & {
  length: string;
};
