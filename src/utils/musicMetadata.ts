import { Metadata } from "~/types/Music";

import {
  encodeBase64,
  getStringLatin1,
  getStringUTF16,
  getStringUTF8,
} from "~/utils/encode";

/** 16進数 */
const HEXADECIMAL = {
  "0x00": 0x00,
  "0x01": 0x01,
  "0x02": 0x02,
  "0x03": 0x03,
} as const;
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

type ID3V2Version = keyof typeof ID3_V2_VERSION;

export function getMusicMetadata(musicData: Uint8Array) {
  const metadata = getMetadataMp3(musicData);
  return metadata;
}

/**
 * ID3タグの読み込み関数。
 * ID3v2ヘッダにおける数値表現はビッグエンディアン(MSB first)。
 * @see https://atmarkit.itmedia.co.jp/icd/root/24/92677424.html
 * @param musicData UTF-8文字コード配列の音楽データ
 * @returns
 */
function ID3v2TagReader(musicData: Uint8Array) {
  const ID3Frames = {
    TIT2: "",
    TPE1: "",
    TALB: "",
    TPE2: "",
    TCON: "",
    APIC: {
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
     * @returns true: `IDName`のID3フレームIDを持つ。 / false: ID3フレームIDを持たない。
     */
    isID3FrameID: function (IDName: keyof typeof ID3_FRAME_ID, index: number) {
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
     * @returns {{ text: string; skip: number }} { text: エンコードされたテキスト skip: スキップ数 }
     */
    readText: function (index: number): { text: string; skip: number } {
      const size = getID3HeaderSize();
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
     * フレームサイズを読み込む
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
     *
     * @param index
     * @returns
     */
    isFrameHeaderFmtFlgIncludeOrgSize: function (index: number) {
      return (
        (musicData[index + 9] & HEXADECIMAL["0x01"]) === HEXADECIMAL["0x01"]
      );
    },
    /**
     *
     * @param index
     * @returns
     */
    readFrameBodySizeV24ForAPIC: function () {
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
    /**
     * UTF-8コード文字配列の画像データを取得する
     * @param beginIndex 画像データの始まりのインデックス
     * @param size 画像データサイズ
     * @returns UTF-8コード文字配列の画像データ
     */
    getImageInUint8Array: function (beginIndex: number, size: number) {
      return musicData.subarray(beginIndex, beginIndex + size);
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
   * @returns {ID3V2Version | "inValid"} ID3v2のバージョン。該当の値がなければ"inValid"を返す。
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

  // FIXME プロトタイプオブジェクトで実装してみたが、うまく動かない場合はこちらの高階関数を使う。
  // /**
  //  * ID3タグフレームを読み込む。
  //  * @returns
  //  */
  // function readID3Frame() {
  //   /**
  //    * `IDName`があるかどうかを判定する
  //    * @param {keyof typeof ID3_FRAME_ID} IDName ID3フレームID名
  //    * @param {number} index UTF-8文字コード配列のインデックス
  //    * @returns true: `IDName`のID3フレームIDを持つ。 / false: ID3フレームIDを持たない。
  //    */
  //   function isID3FrameID(IDName: keyof typeof ID3_FRAME_ID, index: number) {
  //     return (
  //       musicData[index] === ID3_FRAME_ID[IDName][0] &&
  //       musicData[index + 1] === ID3_FRAME_ID[IDName][1] &&
  //       musicData[index + 2] === ID3_FRAME_ID[IDName][2] &&
  //       musicData[index + 3] === ID3_FRAME_ID[IDName][3]
  //     );
  //   }

  //   /**
  //    * テキストの読み込み
  //    * @param {number} index UTF-8文字コード配列のインデックス
  //    * @returns {{ text: string; skip: number }} { text: エンコードされたテキスト skip: スキップ数 }
  //    */
  //   function readText(index: number): { text: string; skip: number } {
  //     const size = getID3HeaderSize();
  //     const encodeIndex = index + HEADER_FRAME_BYTES;
  //     const code = musicData[encodeIndex];

  //     let text = "";
  //     if (code === HEXADECIMAL["0x00"]) {
  //       // ISO-8859-1(Latin-1)
  //       text = getStringLatin1(musicData, encodeIndex + 1, size - 1);
  //     } else if (code === HEXADECIMAL["0x01"]) {
  //       // UTF-16 with BOM
  //       text = getStringUTF16(musicData, encodeIndex + 1, size - 3);
  //     } else if (code === HEXADECIMAL["0x02"]) {
  //       // UTF-16BE without BOM
  //       text = getStringUTF16(musicData, encodeIndex + 1, size - 1);
  //     } else if (code === HEXADECIMAL["0x03"]) {
  //       // UTF-8 (v2.4)
  //       text = getStringUTF8(musicData, encodeIndex + 1, size - 1);
  //     }

  //     return {
  //       text: text,
  //       skip: HEADER_FRAME_BYTES + size,
  //     };
  //   }

  //   /**
  //    * フレームサイズを読み込む
  //    * 4バイト分のデータを結合し、32ビットの整数値を生成する。
  //    * @param {number} index UTF-8文字コード配列のインデックス。
  //    * @returns {number} フレームサイズ。
  //    */
  //   function readID3FrameSize(index: number): number {
  //     return (
  //       // 24ビット左にシフト
  //       (musicData[index + 4] << 24) |
  //       // 16ビット左にシフト
  //       (musicData[index + 5] << 16) |
  //       // 8ビット左にシフト
  //       (musicData[index + 6] << 8) |
  //       // シフト操作無し
  //       musicData[index + 7]
  //     );
  //   }

  //   /**
  //    *
  //    * @param index
  //    * @returns
  //    */
  //   function isFrameHeaderFmtFlgIncludeOrgSize(index: number) {
  //     return (
  //       (musicData[index + 9] & HEXADECIMAL["0x01"]) === HEXADECIMAL["0x01"]
  //     );
  //   }

  //   /**
  //    *
  //    * @param index
  //    * @returns
  //    */
  //   function readFrameBodySizeV24ForAPIC(index: number) {
  //     return (
  //       // 21ビット左にシフト
  //       (musicData[4] << 21) |
  //       // 14ビット左にシフト
  //       (musicData[5] << 14) |
  //       // 7ビット左にシフト
  //       (musicData[6] << 7) |
  //       // シフト操作無し
  //       musicData[7]
  //     );
  //   }

  //   /**
  //    * MimeTypeの読み込み
  //    * @param {number} beginIndex UTF-16でエンコードされる文字列のインデックス
  //    * @returns {string} MimeType
  //    */
  //   function readMimeType(beginIndex: number): string {
  //     let endIndex = beginIndex;
  //     while (true) {
  //       if (musicData[endIndex] === HEXADECIMAL["0x00"]) {
  //         break;
  //       }
  //       endIndex++;
  //     }
  //     const mimeTypeUint8Array = musicData.subarray(beginIndex, endIndex);
  //     return String.fromCharCode.apply(null, [...mimeTypeUint8Array]);
  //   }

  //   /**
  //    * UTF-8コード文字配列の画像データを取得する
  //    * @param beginIndex 画像データの始まりのインデックス
  //    * @param size 画像データサイズ
  //    * @returns UTF-8コード文字配列の画像データ
  //    */
  //   function getImageInUint8Array(beginIndex: number, size: number) {
  //     return musicData.subarray(beginIndex, beginIndex + size);
  //   }

  //   return {
  //     isID3FrameID,
  //     readText,
  //     readID3FrameSize,
  //     isFrameHeaderFmtFlgIncludeOrgSize,
  //     readFrameBodySizeV24ForAPIC,
  //     readMimeType,
  //     getImageInUint8Array,
  //   };
  // }

  /**
   * ID3のフレームを読み込む。
   */
  function readID3Frames() {
    const {
      isID3FrameID,
      readText,
      readID3FrameSize,
      isFrameHeaderFmtFlgIncludeOrgSize,
      readFrameBodySizeV24ForAPIC,
      readMimeType,
      getImageInUint8Array,
    } = ID3Frame;

    // TODO textをどうやって保持すれば良いのかを考える
    for (let i = 0; i < headerSize; ) {
      if (isID3FrameID("TIT2", i)) {
        const { text, skip } = readText(i);
        ID3Frames.TIT2 = text;
        i += skip;
      } else if (isID3FrameID("TPE1", i)) {
        const { text, skip } = readText(i);
        ID3Frames.TPE1 = text;
        i += skip - 1;
      } else if (isID3FrameID("TALB", i)) {
        const { text, skip } = readText(i);
        ID3Frames.TALB = text;
        i += skip;
      } else if (isID3FrameID("TPE2", i)) {
        const { text, skip } = readText(i);
        ID3Frames.TPE2 = text;
        i += skip - 1;
      } else if (isID3FrameID("TCON", i)) {
        const { text, skip } = readText(i);
        ID3Frames.TCON = text;
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

        ID3Frames.APIC.mimeType = mimetype;
        ID3Frames.APIC.binary = getImageInUint8Array(
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
    read: function () {
      readID3Frames();
    },
    getTIT2: function () {
      return ID3Frames.TIT2;
    },
    getTPE1: function () {
      return ID3Frames.TPE1;
    },
    getTALB: function () {
      return ID3Frames.TALB;
    },
    getTPE2: function () {
      return ID3Frames.TPE2;
    },
    getTCON: function () {
      return ID3Frames.TCON;
    },
    getAPIC: function () {
      return ID3Frames.APIC;
    },
  };
}

/**
 * MP3の音楽メタデータの取得
 * @param {Uint8Array} musicData 安岳バイナリデータ
 * @returns {Metadata | undefined} MP3の音楽メタデータ | MP3でなおい場合はundefined
 */
function getMetadataMp3(musicData: Uint8Array): Metadata | undefined {
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
      const imgSrc = "data:" + mimeType + ";base64," + encodeBase64(binary);
      musicMetadata.albumWork = imgSrc;
    }

    return musicMetadata;
  }
}

function getMetadataFLAC(musicData: Uint8Array): Metadata | undefined {}
