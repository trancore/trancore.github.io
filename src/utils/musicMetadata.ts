import { Metadata } from "~/types/Music";

import {
  getIntNumberFromBinary,
  getStringLatin1,
  getStringUTF16,
  getStringUTF8,
  utf8ToUtf16,
} from "~/utils/encode";
import { getImageInBase64, getImageInUint8Array } from "~/utils/music";

/** 16進数 */
const HEXADECIMAL = {
  "0x00": 0x00,
  "0x01": 0x01,
  "0x02": 0x02,
  "0x03": 0x03,
  "0x7f": 0x7f,
  "0x80": 0x80,
} as const;
/**
 * ID3v2のバージョン
 */
const ID3_V2_VERSION = {
  "v2.2": "v2.2",
  "v2.3": "v2.3",
  "v2.4": "v2.4",
} as const;
const HEADER_FRAME_BYTES = 10 as const;
/**
 * ID3タグヘッダ拡張子とUTF-16文字コードのペア
 */
const ID3_HEADER_EXTENSION = {
  ID3: [73, 68, 51],
} as const;
/**
 * ID3タグフレームIDとUTF-16文字コードのペア
 */
const ID3_FRAME_ID = {
  TIT2: [84, 73, 84, 50],
  TPE1: [84, 80, 69, 49],
  TALB: [84, 65, 76, 66],
  TPE2: [84, 80, 69, 50],
  TCON: [84, 67, 79, 78],
  APIC: [65, 80, 73, 67],
} as const;
/**
 * FLACのVorbisComment
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VORBIS_COMMENT = {
  TITLE: "TITLE",
  ARTIST: "ARTIST",
  ALBUM: "ALBUM",
  ALBUMARTIST: "ALBUMARTIST",
  LENGTH: "LENGTH",
  GENRE: "GENRE",
} as const;
/**
 * RIFFヘッダ拡張子とUTF-16文字コードのペア
 */
const RIFF_HEADER = {
  RIFF: [82, 73, 70, 70],
} as const;
const RIFF_LIST_TYPE_INFO_ID = {
  IAAT: "IAAT",
  // アーティスト名
  IART: "IART",
  // 曲のタイトル
  INAM: "INAM",
  // アルバム名
  IPRD: "IPRD",
  // コメント
  ICMT: "ICMT",
  // 作成日
  ICRD: "ICRD",
  // ジャンル
  IGNR: "IGNR",
  // 作成に使用されたソフトウェア名
  ISFT: "ISFT",
} as const;
/**
 * MP4のBoxType
 */
const MP4_BOX_TYPE = {
  FTYP: "ftyp",
  MOOV: "moov",
  META: "meta",
};

type ID3V2Version = keyof typeof ID3_V2_VERSION;

export function getMusicMetadata(musicData: Uint8Array): Metadata | undefined {
  const { data: dataMp3, isID3v2 } = getMetadataMp3(musicData);
  if (isID3v2()) {
    return dataMp3;
  }

  const { data: dataFLAC, isFLAC } = getMetadataFLAC(musicData);
  if (isFLAC()) {
    return dataFLAC;
  }

  const { data: dataWAVE, isWAVE } = getMetadataWAVE(musicData);
  if (isWAVE()) {
    return dataWAVE;
  }

  // const { data: dataApev2, isApev2 } = getMetadataAAC(musicData);
  const { isMp4Box } = getMetadataMp4(musicData);
  console.log(
    "🚀 ~ getMusicMetadata ~ musicData:",
    new TextDecoder().decode(musicData),
  );

  if (isMp4Box()) {
    // return dataWAVE;
  }

  return;
}

/**
 * ID3タグの読み込み関数。
 * ID3v2ヘッダにおける数値表現はビッグエンディアン(MSB first)。
 * @see https://atmarkit.itmedia.co.jp/icd/root/24/92677424.html
 * @param musicData UTF-8文字コード配列の音楽データ
 */
function ID3v2TagReader(musicData: Uint8Array) {
  const ID3Frames = {
    tit2: "",
    tpe1: "",
    talb: "",
    tpe2: "",
    tcon: "",
    apic: {
      mimeType: "",
      binary: new Uint8Array(),
    },
  };

  /** ヘッダ拡張子 */
  const headerExtention = isID3v2() ? "ID3" : "inValid";
  /** ヘッダバージョン */
  const headerVersion = getID3HeaderVersion() || "inValid";
  /** ヘッダーフラグ */
  const headerFlag = getID3HeaderFlag();
  /** ヘッダーサイズ */
  const headerSize = getID3HeaderSize();

  /**
   * ID3タグのフレームに関するプロトタイプオブジェクト
   */
  const ID3Frame = {
    /**
     * `IDName`があるかどうかを判定する
     * @param {keyof typeof ID3_FRAME_ID} IDName ID3フレームID名
     * @param {number} index UTF-8文字コード配列のインデックス
     * @returns {boolean} true: `IDName`のID3フレームIDを持つ。 / false: ID3フレームIDを持たない。
     */
    isID3FrameID: function (
      IDName: keyof typeof ID3_FRAME_ID,
      index: number,
    ): boolean {
      return (
        musicData[index] === ID3_FRAME_ID[IDName][0] &&
        musicData[index + 1] === ID3_FRAME_ID[IDName][1] &&
        musicData[index + 2] === ID3_FRAME_ID[IDName][2] &&
        musicData[index + 3] === ID3_FRAME_ID[IDName][3]
      );
    },
    /**
     * テキストの読み込み
     * @param {number} index UTF-8文字コード配列のインデックス
     * @param {number} size フレームサイズ
     * @returns {{ text: string; skip: number }} { text: エンコードされたテキスト skip: スキップ数 }
     */
    readText: function (
      index: number,
      size: number,
    ): { text: string; skip: number } {
      const encodeIndex = index + HEADER_FRAME_BYTES;
      const code = musicData[encodeIndex];

      let text = "";
      if (code === HEXADECIMAL["0x00"]) {
        // ISO-8859-1(Latin-1)
        text = getStringLatin1(musicData, encodeIndex + 1, size - 1);
      } else if (code === HEXADECIMAL["0x01"]) {
        // UTF-16 with BOM
        text = getStringUTF16(musicData, encodeIndex + 1, size - 3);
      } else if (code === HEXADECIMAL["0x02"]) {
        // UTF-16BE without BOM
        text = getStringUTF16(musicData, encodeIndex + 1, size - 1);
      } else if (code === HEXADECIMAL["0x03"]) {
        // UTF-8 (v2.4)
        text = getStringUTF8(musicData, encodeIndex + 1, size - 1);
      }

      return {
        text: text,
        skip: HEADER_FRAME_BYTES + size,
      };
    },
    /**
     * フレームサイズを読み込む。
     * 4バイト分のデータを結合し、32ビットの整数値を生成する。
     * @param {number} index UTF-8文字コード配列のインデックス。
     * @returns {number} フレームサイズ。
     */
    readID3FrameSize: function (index: number): number {
      return (
        // 24ビット左にシフト
        (musicData[index + 4] << 24) |
        // 16ビット左にシフト
        (musicData[index + 5] << 16) |
        // 8ビット左にシフト
        (musicData[index + 6] << 8) |
        // シフト操作無し
        musicData[index + 7]
      );
    },
    /**
     * ヘッダーフレームフォーマットがorgSizeを含むフラグかどうか。
     * @param index インデックス
     * @returns {boolean} true: 含む / false: 含まない
     */
    isFrameHeaderFmtFlgIncludeOrgSize: function (index: number): boolean {
      return (
        (musicData[index + 9] & HEXADECIMAL["0x01"]) === HEXADECIMAL["0x01"]
      );
    },
    /**
     * ID3v2.4のAPICのフレームボディを読み込む
     * @param index インデックス
     * @returns {number} フレームサイズ
     */
    readFrameBodySizeV24ForAPIC: function (): number {
      return (
        // 21ビット左にシフト
        (musicData[4] << 21) |
        // 14ビット左にシフト
        (musicData[5] << 14) |
        // 7ビット左にシフト
        (musicData[6] << 7) |
        // シフト操作無し
        musicData[7]
      );
    },
    /**
     * MimeTypeの読み込み
     * @param {number} beginIndex UTF-16でエンコードされる文字列のインデックス
     * @returns {string} MimeType
     */
    readMimeType: function (beginIndex: number): string {
      let endIndex = beginIndex;
      for (;;) {
        if (musicData[endIndex] === HEXADECIMAL["0x00"]) {
          break;
        }
        endIndex++;
      }
      const mimeTypeUint8Array = musicData.subarray(beginIndex, endIndex);
      return String.fromCharCode.apply(null, [...mimeTypeUint8Array]);
    },
  };

  /**
   * iD3v2かどうかを判定する。
   * @returns {boolean} true: iD3v2である / false: iD3v2ではない
   */
  function isID3v2(): boolean {
    return (
      musicData[0] === ID3_HEADER_EXTENSION["ID3"][0] &&
      musicData[1] === ID3_HEADER_EXTENSION["ID3"][1] &&
      musicData[2] === ID3_HEADER_EXTENSION["ID3"][2]
    );
  }
  /**
   * ID3タグヘッダーのバージョン2系のマイナーバージョンを取得する。
   * @returns {ID3V2Version | undefined} ID3v2のバージョン。該当の値がなければ"inValid"を返す。
   */
  function getID3HeaderVersion(): ID3V2Version | undefined {
    switch (musicData[3]) {
      case 2:
        return "v2.2";
      case 3:
        return "v2.3";
      case 4:
        return "v2.4";
      default:
    }
  }
  /**
   * ID3タグヘッダーフラグを取得する。
   * @returns {number} ヘッダーフラグ
   */
  function getID3HeaderFlag(): number {
    return musicData[4];
  }
  /**
   * ID3タグヘッダーサイズを取得する。
   * @returns {number} ID3v2ヘッダ以降のID3v2タグのサイズ
   */
  function getID3HeaderSize(): number {
    // 読み込み処理方法(Syncsafe Integer)
    // uint32_t val = (((uint8_t)p[0])<<21) + (((uint8_t)p[1])<<14) + (((uint8_t)p[2])<<7) + (uint8_t)p[3];
    // ((uint8_t)p[0]) << 21
    // p[0] は最初のバイトで、それを21ビット左にシフトしています。この操作により、このバイトは結果の32ビット整数の最上位ビット部分に配置されます。
    // ((uint8_t)p[1]) << 14
    // p[1] は次のバイトで、それを14ビット左にシフトしています。このバイトは、32ビット整数の上位に続くビット部分に配置されます。
    // ((uint8_t)p[2]) << 7
    // p[2] は3番目のバイトで、7ビット左にシフトされます。このバイトは、さらに下位のビット部分に配置されます。
    // (uint8_t)p[3]
    // p[3] は最下位バイトで、シフト操作をせずそのまま配置されます。

    // 数値はビッグエンディアンで格納されるため、[6], [7], [8], [9]の順でビットを左にシフトします。
    // 各ビットは下位7bitのみが有効になります。
    return (
      // 21ビット左にシフト
      (musicData[6] << 21) |
      // 14ビット左にシフト
      (musicData[7] << 14) |
      // 7ビット左にシフト
      (musicData[8] << 7) |
      // シフト操作無し
      musicData[9]
    );
  }
  // TODO 今のところ使う想定がないので実装しない。
  // function readID3HeaderExtendedHeader() {}

  /**
   * ID3のフレームを読み込む。
   * @returns {void}
   */
  function readID3Frames(): void {
    const {
      isID3FrameID,
      readText,
      readID3FrameSize,
      isFrameHeaderFmtFlgIncludeOrgSize,
      readFrameBodySizeV24ForAPIC,
      readMimeType,
    } = ID3Frame;

    // 音楽メタ情報を取得する。
    for (let i = 0; i < headerSize; ) {
      if (isID3FrameID("TIT2", i)) {
        const { text, skip } = readText(i, readID3FrameSize(i));
        ID3Frames.tit2 = text;
        i += skip;
      } else if (isID3FrameID("TPE1", i)) {
        const { text, skip } = readText(i, readID3FrameSize(i));
        ID3Frames.tpe1 = text;
        i += skip - 1;
      } else if (isID3FrameID("TALB", i)) {
        const { text, skip } = readText(i, readID3FrameSize(i));
        ID3Frames.talb = text;
        i += skip;
      } else if (isID3FrameID("TPE2", i)) {
        const { text, skip } = readText(i, readID3FrameSize(i));
        ID3Frames.tpe2 = text;
        i += skip - 1;
      } else if (isID3FrameID("TCON", i)) {
        const { text, skip } = readText(i, readID3FrameSize(i));
        ID3Frames.tcon = text;
        i += skip - 1;
      } else if (isID3FrameID("APIC", i)) {
        let frameSize = readID3FrameSize(i);
        let orgSizeByte = 0;

        if (
          headerVersion === ID3_V2_VERSION["v2.4"] &&
          isFrameHeaderFmtFlgIncludeOrgSize(i)
        ) {
          orgSizeByte = 4;
          frameSize = readFrameBodySizeV24ForAPIC();
          // v2.4対応がうまくいかず、ここで書くのを一旦終了
        }

        const mimetype = readMimeType(i + HEADER_FRAME_BYTES + 1 + orgSizeByte);
        const imageIndex =
          i + HEADER_FRAME_BYTES + (1 + orgSizeByte + mimetype.length + 1 + 2);

        ID3Frames.apic.mimeType = mimetype;
        ID3Frames.apic.binary = getImageInUint8Array(
          musicData,
          imageIndex,
          frameSize - (1 + mimetype.length + 1 + 2),
        );

        i += HEADER_FRAME_BYTES + frameSize;
      } else {
        i++;
      }
    }
  }

  const header = {
    headerExtention,
    headerVersion,
    headerFlag,
    headerSize,
  };

  return {
    header,
    isID3v2,
    read: readID3Frames,
    getTIT2: function () {
      return ID3Frames.tit2;
    },
    getTPE1: function () {
      return ID3Frames.tpe1;
    },
    getTALB: function () {
      return ID3Frames.talb;
    },
    getTPE2: function () {
      return ID3Frames.tpe2;
    },
    getTCON: function () {
      return ID3Frames.tcon;
    },
    getAPIC: function () {
      return ID3Frames.apic;
    },
  };
}

/**
 * MP3の音楽メタデータの取得
 * @param {Uint8Array} musicData 音楽バイナリデータ`
 */
function getMetadataMp3(musicData: Uint8Array): {
  data?: Metadata;
  isID3v2: () => boolean;
} {
  const {
    isID3v2,
    read,
    getTIT2,
    getTPE1,
    getTALB,
    getTPE2,
    getTCON,
    getAPIC,
  } = ID3v2TagReader(musicData);

  if (isID3v2()) {
    read();

    const musicMetadata: Metadata = {
      title: getTIT2(),
      artist: getTPE1(),
      album: getTALB(),
      albumArtists: getTPE2(),
      genre: getTCON(),
      albumWork: "",
    };
    const { mimeType, binary } = getAPIC();

    if (mimeType !== "") {
      musicMetadata.albumWork = getImageInBase64(mimeType, binary);
    }

    return {
      data: musicMetadata,
      isID3v2,
    };
  }

  return {
    isID3v2,
  };
}

/**
 * VorbisCommentの読み込み関数。
 * @param musicData 音楽情報 UTF-8文字コード配列の音楽データ
 */
function vorbisCommentTagReader(musicData: Uint8Array) {
  const vorbisCommentMetadataBlocks = {
    title: "",
    artist: "",
    album: "",
    albumArtist: "",
    length: "",
    genre: "",
    picture: {
      mimeType: "",
      binary: new Uint8Array(),
    },
  };

  /**
   * VorbisCommentのクロージャ関数
   */
  function vorbisComment() {
    // METADATA_BLOCK_HEADERの4バイト分をスキップ
    let index = 4;

    return {
      getIndex: function () {
        return index;
      },
      setIndex: function (newIndex: number) {
        index = newIndex;
      },
      increment: function (byNum: number) {
        index += byNum;
      },
      checkSizeLength: function (
        getIndex: () => number,
        skipNumber: number = 0,
      ) {
        if (getIndex() + skipNumber > musicData.length) {
          return;
        }
      },
      isVorbisComment: function (
        comment: keyof typeof VORBIS_COMMENT,
        text: string,
        substringEndNum: number,
      ) {
        return (
          text.substring(0, substringEndNum).toUpperCase() === `${comment}=`
        );
      },
    };
  }

  /**
   * pictureのプロトタイプオブジェクト
   */
  const picture = {
    /**
     * 規定のバイト数で定義される画像情報の長さを取得する
     * @param {1 | 2 | 3 | 4} byteNumber バイナリデータから取り出すバイト数
     * @param vorbisComment VorbisCommentのクロージャ関数
     * @returns {number | undefined} 画像情報の長さ
     */
    getFieldLength: function (
      byteNumber: 1 | 2 | 3 | 4,
      {
        getIndex,
        increment,
        checkSizeLength,
      }: ReturnType<typeof vorbisComment>,
    ): number | undefined {
      const length = getIntNumberFromBinary(musicData, getIndex(), byteNumber);
      increment(byteNumber);
      if (length & 0x80000000) {
        return;
      }
      checkSizeLength(getIndex, length);
      return length;
    },
  };

  /**
   * FLACファイルかどうか
   * @returns {boolean} true: FLACファイルである / false: FLACファイルでない
   */
  function isFLAC(): boolean {
    // ASCII表記でfLaC
    return getIntNumberFromBinary(musicData, 0, 4) == 0x664c6143 ? true : false;
  }

  /**
   * VorbisCommentを読み込む。
   * @returns {void}
   */
  function readVorbisComments(): void {
    const resultVorbisComment = vorbisComment();
    const { getIndex, setIndex, increment, checkSizeLength, isVorbisComment } =
      resultVorbisComment;
    const { getFieldLength } = picture;

    for (;;) {
      // METADATA_BLOCK_HEADER
      checkSizeLength(getIndex, 4);

      const flagType = getIntNumberFromBinary(musicData, getIndex(), 1);
      increment(1);

      let length = getIntNumberFromBinary(musicData, getIndex(), 3);
      increment(3);

      checkSizeLength(getIndex, length);

      // METADATA_BLOCK_DATAの領域
      switch (
        // BLOCK_TYPEの領域
        flagType & HEXADECIMAL["0x7f"]
      ) {
        case 4: {
          // VORBIS_COMMENT
          // 構造：https://www.xiph.org/vorbis/doc/v-comment.html#structure
          const skip = getIndex() + length;

          if (length < 4) {
            return;
          }

          length = getIntNumberFromBinary(musicData, getIndex(), 4, true);
          increment(4);

          if (length & 0x80000000) {
            // vendor_length
            return;
          }

          checkSizeLength(getIndex, length);

          increment(length);
          // vendor_string
          checkSizeLength(getIndex, 4);

          // user_comment_list_length
          const nComments = getIntNumberFromBinary(
            musicData,
            getIndex(),
            4,
            true,
          );
          increment(4);

          if (nComments & 0x80000000) {
            return;
          }

          // ここからVorbisCommentの走査
          for (let i = 0; i < nComments; i++) {
            checkSizeLength(getIndex, 4);
            length = getIntNumberFromBinary(musicData, getIndex(), 4, true);
            increment(4);

            if (length & 0x80000000) {
              // length
              return;
            }

            checkSizeLength(getIndex, length);
            // commentの抽出
            let comment = "";
            for (let j = length; j > 0; j--) {
              const index = getIndex();
              comment += String.fromCharCode(musicData[index]);
              setIndex(index + 1);
            }

            if (isVorbisComment("TITLE", comment, 6)) {
              const title = utf8ToUtf16(comment.substring(6));
              vorbisCommentMetadataBlocks.title = title;
            }
            if (isVorbisComment("ARTIST", comment, 7)) {
              const artist = utf8ToUtf16(comment.substring(7));
              vorbisCommentMetadataBlocks.artist = artist;
            }
            if (isVorbisComment("ALBUM", comment, 6)) {
              const album = utf8ToUtf16(comment.substring(6));
              vorbisCommentMetadataBlocks.album = album;
            }
            if (isVorbisComment("ALBUMARTIST", comment, 12)) {
              const albumArtist = utf8ToUtf16(comment.substring(12));
              vorbisCommentMetadataBlocks.albumArtist = albumArtist;
            }
            if (isVorbisComment("LENGTH", comment, 7)) {
              const length = utf8ToUtf16(comment.substring(7));
              vorbisCommentMetadataBlocks.length = length;
            }
            if (isVorbisComment("GENRE", comment, 7)) {
              const genre = utf8ToUtf16(comment.substring(7));
              vorbisCommentMetadataBlocks.genre = genre;
            }
          }

          setIndex(skip);
          break;
        }
        case 6: {
          // PICTURE
          const skip = getIndex() + length;

          // ID3v2 APICフレームに従った画像のタイプ
          const pictureType = getIntNumberFromBinary(musicData, getIndex(), 4);
          increment(4);
          if (pictureType & 0x80000000) {
            return;
          }
          checkSizeLength(getIndex, length);

          // MIMEタイプの長さ
          const mimeTypeStringLengthByByte = getFieldLength(
            4,
            resultVorbisComment,
          );
          if (mimeTypeStringLengthByByte === undefined) return;

          // MIMEタイプ
          let mimeType = "";
          for (let j = mimeTypeStringLengthByByte; j > 0; j--) {
            const index = getIndex();
            mimeType += String.fromCharCode(musicData[index]);
            increment(1);
          }
          vorbisCommentMetadataBlocks.picture.mimeType = mimeType;

          // 説明の長さ
          const descriptionLengthByByte = getFieldLength(
            4,
            resultVorbisComment,
          );
          if (descriptionLengthByByte === undefined) return;

          // 説明
          let description = "";
          for (let j = descriptionLengthByByte; j > 0; j--) {
            const index = getIndex();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            description += String.fromCharCode(musicData[index]);
            increment(1);
          }

          // 画像幅
          const widthOfPictureByPixel = getFieldLength(4, resultVorbisComment);
          if (widthOfPictureByPixel === undefined) return;

          // 画像高さ
          const hHeightOfPictureByPixel = getFieldLength(
            4,
            resultVorbisComment,
          );
          if (hHeightOfPictureByPixel === undefined) return;

          // 色深度(ビット/ピクセル)
          const colorDepthOfPicture = getFieldLength(4, resultVorbisComment);
          if (colorDepthOfPicture === undefined) return;

          // 色数
          const colorOfnumberAndPicture = getFieldLength(
            4,
            resultVorbisComment,
          );
          if (colorOfnumberAndPicture === undefined) return;

          // 画像データの長さ
          const pictureLengthByByte = getFieldLength(4, resultVorbisComment);
          if (pictureLengthByByte === undefined) return;

          // 画像データ
          const pictureBinary = getImageInUint8Array(
            musicData,
            getIndex(),
            pictureLengthByByte + 1,
          );

          vorbisCommentMetadataBlocks.picture.binary = pictureBinary;

          setIndex(skip);
          break;
        }

        case 127:
          return;
        default:
          increment(length);
      }
      if (flagType & HEXADECIMAL["0x80"]) {
        // last metadata block
        break;
      }
    }
  }

  return {
    isFLAC,
    read: readVorbisComments,
    getTitle: function () {
      return vorbisCommentMetadataBlocks.title;
    },
    getArtist: function () {
      return vorbisCommentMetadataBlocks.artist;
    },
    getAlbum: function () {
      return vorbisCommentMetadataBlocks.album;
    },
    getAlbumArtist: function () {
      return vorbisCommentMetadataBlocks.albumArtist;
    },
    getLength: function () {
      return vorbisCommentMetadataBlocks.length;
    },
    getGenre: function () {
      return vorbisCommentMetadataBlocks.genre;
    },
    getPicture: function () {
      return vorbisCommentMetadataBlocks.picture;
    },
  };
}

/**
 * FLACの音楽メタデータの取得
 * @param {Uint8Array} musicData 音楽バイナリデータ
 * @returns FLACの音楽メタデータ | FLACでない場合はundefined
 */
function getMetadataFLAC(musicData: Uint8Array): {
  data?: Metadata;
  isFLAC: () => boolean;
} {
  const {
    isFLAC,
    read,
    getTitle,
    getArtist,
    getAlbum,
    getAlbumArtist,
    getGenre,
    getPicture,
  } = vorbisCommentTagReader(musicData);

  read();

  if (isFLAC()) {
    const musicMetadata: Metadata = {
      title: getTitle(),
      artist: getArtist(),
      album: getAlbum(),
      albumArtists: getAlbumArtist(),
      genre: getGenre(),
      albumWork: "",
    };
    const { mimeType, binary } = getPicture();

    if (mimeType !== "") {
      musicMetadata.albumWork = getImageInBase64(mimeType, binary);
    }

    return {
      data: musicMetadata,
      isFLAC,
    };
  }

  return {
    isFLAC,
  };
}

/**
 * RIFFの読み込み関数。
 * @param {Uint8Array} musicData 音楽バイナリデータ
 */
function RIFFTagReader(musicData: Uint8Array) {
  const RIFFMetadata = {
    title: "",
    artist: "",
    album: "",
    albumArtist: "",
    length: "",
    genre: "",
  };

  /**
   * RIFFのクロージャ関数
   */
  function RIFF() {
    // ChunkIDの4バイト分をスキップ
    let index = 4;

    return {
      getIndex: function () {
        return index;
      },
      setIndex: function (newIndex: number) {
        index = newIndex;
      },
      increment: function (byNum: number) {
        index += byNum;
      },
      isRIFF: function (
        comment: keyof typeof RIFF_LIST_TYPE_INFO_ID,
        text: string,
        substringEndNum: number,
      ) {
        return (
          text.substring(0, substringEndNum).toUpperCase() === `${comment}=`
        );
      },
      isRIFFListTypeInfoID: function (
        id: keyof typeof RIFF_LIST_TYPE_INFO_ID,
        index: number,
        byteNum: 4,
      ) {
        const number = getIntNumberFromBinary(musicData, index, byteNum);
        const text = String.fromCharCode(
          (number >> 24) & 0xff,
          (number >> 16) & 0xff,
          (number >> 8) & 0xff,
          number & 0xff,
        );

        return text === RIFF_LIST_TYPE_INFO_ID[id];
      },
      readText: function (index: number, byteNum: 1 | 2 | 3 | 4) {
        const size = getIntNumberFromBinary(musicData, index, byteNum, true);

        let text = "";
        for (let j = 0; j < size; j++) {
          text += String.fromCharCode(musicData[byteNum + index + j]);
        }

        return {
          text,
          skip: byteNum + size - 1,
        };
      },
    };
  }

  /**
   * WAVEかどうかを判定する。
   * @returns {boolean} true: iD3v2である / false: iD3v2ではない
   */
  function isWAVE(): boolean {
    return (
      musicData[0] === RIFF_HEADER["RIFF"][0] &&
      musicData[1] === RIFF_HEADER["RIFF"][1] &&
      musicData[2] === RIFF_HEADER["RIFF"][2] &&
      musicData[3] === RIFF_HEADER["RIFF"][3]
    );
  }

  /**
   * RIFFを読み込む。
   * @returns {void}
   */
  function readRIFFs(): void {
    const { getIndex, increment, isRIFFListTypeInfoID, readText } = RIFF();
    for (;;) {
      // ファイル全体のバイト数からChunkIDとChunkSizeの8バイトを引いたサイズ
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const chunkSize = getIntNumberFromBinary(musicData, getIndex(), 4, true);
      increment(4);

      // ファイル識別子
      const formatNumber = getIntNumberFromBinary(musicData, getIndex(), 4);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const format = String.fromCharCode(
        (formatNumber >> 24) & 0xff,
        (formatNumber >> 16) & 0xff,
        (formatNumber >> 8) & 0xff,
        formatNumber & 0xff,
      );
      increment(4);

      // フォーマットチャンクID
      const formatChunkIDNumber = getIntNumberFromBinary(
        musicData,
        getIndex(),
        4,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const formatChunkID = String.fromCharCode(
        (formatChunkIDNumber >> 24) & 0xff,
        (formatChunkIDNumber >> 16) & 0xff,
        (formatChunkIDNumber >> 8) & 0xff,
        formatChunkIDNumber & 0xff,
      );
      increment(4);

      // フォーマットチャンクサイズ
      // 16: リニアPCM。そのほかは16+拡張パラメータ
      const formatChunk1Size = getIntNumberFromBinary(
        musicData,
        getIndex(),
        4,
        true,
      );
      increment(4);

      if (formatChunk1Size === 16) {
        // 音声フォーマット。
        // 1: 非圧縮のリニアPCMフォーマット / 6: A-law / 7: μ-law。それ以外もある。
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const audioFormat = getIntNumberFromBinary(
          musicData,
          getIndex(),
          2,
          true,
        );
        increment(2);

        // チャンネル数。
        // 1: モノラル / 2: ステレオ
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const numChannels = getIntNumberFromBinary(
          musicData,
          getIndex(),
          2,
          true,
        );
        increment(2);

        // サンプリングレート[Hz]。
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sampleRate = getIntNumberFromBinary(
          musicData,
          getIndex(),
          4,
          true,
        );
        increment(4);

        // 1秒あたりのバイト数の平均。
        // byteRate = SampleRate * NumChannels * BitsPerSample/8
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const byteRate = getIntNumberFromBinary(musicData, getIndex(), 4, true);
        increment(4);

        // ブロックサイズ。
        // blockAlign = NumChannels * BitsPerSample/8
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const blockAlign = getIntNumberFromBinary(
          musicData,
          getIndex(),
          2,
          true,
        );
        increment(2);

        // ビット／サンプル。1サンプルに必要なビット数。
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const bitsPerSample = getIntNumberFromBinary(
          musicData,
          getIndex(),
          2,
          true,
        );
        increment(2);

        // TODO ここから、音声フォーマットが1以外の場合、拡張パラメータが入る場合がある。
        // ここでは一旦無視する。
      }

      // チャンクID（listChunkID="LIST"）
      const chunkIDNumber = getIntNumberFromBinary(musicData, getIndex(), 4);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const chunkID = String.fromCharCode(
        (chunkIDNumber >> 24) & 0xff,
        (chunkIDNumber >> 16) & 0xff,
        (chunkIDNumber >> 8) & 0xff,
        chunkIDNumber & 0xff,
      );
      increment(4);

      if (chunkID === "LIST") {
        // リストチャンクサイズ
        const listChunkSize = getIntNumberFromBinary(
          musicData,
          getIndex(),
          4,
          true,
        );
        increment(4);

        // リストチャンクタイプ
        const listChunkTypeNumber = getIntNumberFromBinary(
          musicData,
          getIndex(),
          4,
        );
        const listChunkType = String.fromCharCode(
          (listChunkTypeNumber >> 24) & 0xff,
          (listChunkTypeNumber >> 16) & 0xff,
          (listChunkTypeNumber >> 8) & 0xff,
          listChunkTypeNumber & 0xff,
        );
        increment(4);

        if (listChunkType === "INFO") {
          // リストチャンクインフォID
          for (let i = 0; i < listChunkSize; i++) {
            if (
              isRIFFListTypeInfoID(RIFF_LIST_TYPE_INFO_ID.INAM, getIndex(), 4)
            ) {
              // infoIDの分を進める
              increment(4);
              i += 4;

              const { text, skip } = readText(getIndex(), 4);
              RIFFMetadata.title = text;
              increment(skip);
              i += skip;
            }
            if (
              isRIFFListTypeInfoID(RIFF_LIST_TYPE_INFO_ID.IAAT, getIndex(), 4)
            ) {
              // infoIDの分を進める
              increment(4);
              i += 4;

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { text, skip } = readText(getIndex(), 4);

              increment(skip);
              i += skip;
            }
            if (
              isRIFFListTypeInfoID(RIFF_LIST_TYPE_INFO_ID.IART, getIndex(), 4)
            ) {
              // infoIDの分を進める
              increment(4);
              i += 4;

              const { text, skip } = readText(getIndex(), 4);
              RIFFMetadata.artist = text;
              increment(skip);
              i += skip;
            }
            if (
              isRIFFListTypeInfoID(RIFF_LIST_TYPE_INFO_ID.ICRD, getIndex(), 4)
            ) {
              // infoIDの分を進める
              increment(4);
              i += 4;

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { text, skip } = readText(getIndex(), 4);

              increment(skip);
              i += skip;
            }
            if (
              isRIFFListTypeInfoID(RIFF_LIST_TYPE_INFO_ID.IPRD, getIndex(), 4)
            ) {
              // infoIDの分を進める
              increment(4);
              i += 4;

              const { text, skip } = readText(getIndex(), 4);
              RIFFMetadata.album = text;
              increment(skip);
              i += skip;
            }
            if (
              isRIFFListTypeInfoID(RIFF_LIST_TYPE_INFO_ID.IGNR, getIndex(), 4)
            ) {
              // infoIDの分を進める
              increment(4);
              i += 4;

              const { text, skip } = readText(getIndex(), 4);
              RIFFMetadata.genre = text;
              increment(skip);
              i += skip;
            }

            increment(1);
          }
        }
      }

      return;
    }
  }

  return {
    isWAVE,
    read: readRIFFs,
    getTitle: function () {
      return RIFFMetadata.title;
    },
    getArtist: function () {
      return RIFFMetadata.artist;
    },
    getAlbum: function () {
      return RIFFMetadata.album;
    },
    getAlbumArtist: function () {
      return RIFFMetadata.albumArtist;
    },
    getLength: function () {
      return RIFFMetadata.length;
    },
    getGenre: function () {
      return RIFFMetadata.genre;
    },
  };
}

/**
 * WAVEの音楽メタデータの取得
 * @param {Uint8Array} musicData 音楽バイナリデータ
 * @returns WAVEの音楽メタデータ | FLACでない場合はundefined
 */
function getMetadataWAVE(musicData: Uint8Array) {
  const {
    isWAVE,
    read,
    getTitle,
    getArtist,
    getAlbum,
    getAlbumArtist,
    getGenre,
  } = RIFFTagReader(musicData);

  read();

  if (isWAVE()) {
    const musicMetadata: Metadata = {
      title: getTitle(),
      artist: getArtist(),
      album: getAlbum(),
      albumArtists: getAlbumArtist(),
      genre: getGenre(),
      // WAVEはアルバムワークが定義されていないので空文字のまま
      albumWork: "",
    };

    return {
      data: musicMetadata,
      isWAVE,
    };
  }

  return {
    isWAVE,
  };
}

/**
 * Mp4Boxの読み込み関数。
 * @param {Uint8Array} musicData 音楽バイナリデータ
 */
function mp4BoxTagReader(musicData: Uint8Array) {
  const mp4BoxMetadata = {
    title: "",
    artist: "",
    album: "",
    albumArtist: "",
    length: "",
    genre: "",
  };

  /**
   * MP4Boxのクロージャ関数
   */
  function mp4Box() {
    let index = 0;

    return {
      getIndex: function () {
        return index;
      },
      setIndex: function (newIndex: number) {
        index = newIndex;
      },
      increment: function (byNum: number) {
        index += byNum;
      },
      readText: function (index: number, byteNum: 1 | 2 | 3 | 4) {
        const size = getIntNumberFromBinary(musicData, index, byteNum, true);

        let text = "";
        for (let j = 0; j < size; j++) {
          text += String.fromCharCode(musicData[byteNum + index + j]);
        }

        return {
          text,
          skip: byteNum + size - 1,
        };
      },
    };
  }

  /**
   * MP4Boxかどうかを判定する。
   * @returns {boolean} true: APEv2である / false: APEv2ではない
   */
  function isMp4Box(): boolean {
    // const boxSize = getIntNumberFromBinary(musicData, 0, 4);
    const ftyp = getIntNumberFromBinary(musicData, 4, 4);
    const ftypText = String.fromCharCode(
      (ftyp >> 24) & 0xff,
      (ftyp >> 16) & 0xff,
      (ftyp >> 8) & 0xff,
      ftyp & 0xff,
    );

    return ftypText === MP4_BOX_TYPE.FTYP;
  }

  /**
   * MP4Boxを読み込む。
   * @returns {void}
   */
  function readMp4Boxs(): void {
    const { getIndex, setIndex, increment, readText } = mp4Box();

    console.log("🚀 ~ readMp4Boxs ~ musicData.length:", musicData.length);

    for (let i = 0; i < musicData.length; i++) {
      const boxSize = getIntNumberFromBinary(musicData, getIndex(), 4);
      increment(4);
      i += 4;

      const boxTypeNumber = getIntNumberFromBinary(musicData, getIndex(), 4);
      increment(4);
      i += 4;

      const boxTypeText = String.fromCharCode(
        (boxTypeNumber >> 24) & 0xff,
        (boxTypeNumber >> 16) & 0xff,
        (boxTypeNumber >> 8) & 0xff,
        boxTypeNumber & 0xff,
      );

      if (boxTypeText === MP4_BOX_TYPE.MOOV) {
        for (let j = 0; j < boxSize - 8; j++) {
          const boxSize = getIntNumberFromBinary(musicData, getIndex(), 4);
          increment(4);
          j += 4;

          const boxTypeNumber = getIntNumberFromBinary(
            musicData,
            getIndex(),
            4,
          );
          increment(4);
          j += 4;

          const boxTypeText = String.fromCharCode(
            (boxTypeNumber >> 24) & 0xff,
            (boxTypeNumber >> 16) & 0xff,
            (boxTypeNumber >> 8) & 0xff,
            boxTypeNumber & 0xff,
          );

          if (boxTypeText === MP4_BOX_TYPE.META) {
            console.log("🚀 ~ readMp4Boxs ~ boxText:", boxTypeText);
            console.log("🚀 ~ readMp4Boxs ~ boxSize:", boxSize);
            for (let k = 0; k < boxSize; k++) {
              const boxSize = getIntNumberFromBinary(musicData, getIndex(), 4);
              // TODO boxSizeが0のままサイイズ数が取れていない。
              console.log("🚀 ~ readMp4Boxs ~ boxSize:", boxSize);
              increment(4);
              k += 4;

              const boxTypeNumber = getIntNumberFromBinary(
                musicData,
                getIndex(),
                4,
              );
              increment(4);
              k += 4;

              const boxTypeText = String.fromCharCode(
                (boxTypeNumber >> 24) & 0xff,
                (boxTypeNumber >> 16) & 0xff,
                (boxTypeNumber >> 8) & 0xff,
                boxTypeNumber & 0xff,
              );

              if (boxTypeText === "©nam") {
                const boxSize = getIntNumberFromBinary(
                  musicData,
                  getIndex(),
                  4,
                );
                increment(4);
                k += 4;

                const boxTypeNumber = getIntNumberFromBinary(
                  musicData,
                  getIndex(),
                  4,
                );
                increment(4);
                k += 4;

                const boxTypeText = String.fromCharCode(
                  (boxTypeNumber >> 24) & 0xff,
                  (boxTypeNumber >> 16) & 0xff,
                  (boxTypeNumber >> 8) & 0xff,
                  boxTypeNumber & 0xff,
                );

                if (boxTypeText === "data") {
                  const boxSize = getIntNumberFromBinary(
                    musicData,
                    getIndex(),
                    4,
                  );
                  increment(4);
                  k += 4;

                  const boxTypeNumber = getIntNumberFromBinary(
                    musicData,
                    getIndex(),
                    4,
                  );
                  increment(4);
                  k += 4;

                  const boxTypeText = String.fromCharCode(
                    (boxTypeNumber >> 24) & 0xff,
                    (boxTypeNumber >> 16) & 0xff,
                    (boxTypeNumber >> 8) & 0xff,
                    boxTypeNumber & 0xff,
                  );
                  // TODO 取得したいmetadataの想定
                  console.log("🚀 ~ readMp4Boxs ~ boxTypeText:", boxTypeText);
                } else {
                  const skip = boxSize - 8;
                  increment(skip);
                  k += skip;
                }
              } else {
                const skip = boxSize - 8;
                increment(skip);
                k += skip;
              }
            }
          } else {
            const skip = boxSize - 8;
            increment(skip);
            j += skip;
          }
        }
        return;
      } else {
        const skip = boxSize - 8;
        increment(skip);
        i += skip;
      }
    }
  }

  return { isMp4Box, read: readMp4Boxs };
}

/**
 * MP4の音楽メタデータの取得
 * @param {Uint8Array} musicData 音楽バイナリデータ
 * @returns MP4の音楽メタデータ | MP4でない場合はundefined
 */
function getMetadataMp4(musicData: Uint8Array) {
  const { isMp4Box, read } = mp4BoxTagReader(musicData);

  read();

  // if (isWAVE()) {
  //   const musicMetadata: Metadata = {
  //     title: getTitle(),
  //     artist: getArtist(),
  //     album: getAlbum(),
  //     albumArtists: getAlbumArtist(),
  //     genre: getGenre(),
  //     // WAVEはアルバムワークが定義されていないので空文字のまま
  //     albumWork: "",
  //   };

  //   return {
  //     data: musicMetadata,
  //     isWAVE,
  //   };
  // }

  return {
    isMp4Box,
  };
}
