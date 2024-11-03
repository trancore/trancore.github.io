/** 16進数 */
const HEXADECIMAL = {
  "0x07": 0x07,
  "0x0f": 0x0f,
  "0x1f": 0x1f,
  "0x3f": 0x3f,
  "0x80": 0x80,
  "0xc0": 0xc0,
  "0xc2": 0xc2,
  "0xe0": 0xe0,
  "0xf0": 0xf0,
  "0xf5": 0xf5,
  "0XFE": 0xfe,
  "0XFF": 0xff,
};
/**
 * エンコードテーブル
 */
const ENCODE_TABLE = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "/",
] as const;

const GETA = "=" as const;

const NUM_OF_BYTES = 3 as const;

/**
 * Latin1文字コードでの文字テキストを取得する。
 * Latin1とは、ISO/IEC 8859という文字コードのパート1の通称のこと。
 * ISO/IEC 8859は、8ビット256文字の文字コードであり、複数の「パート」がある。
 * 256文字のうち前半128文字は全パート共通で、ASCII文字コードと同一になっている。
 * そして後半128文字は、パートによって内容が異なる。
 * Latin1 で使える文字は以下で見れる。
 * @see https://ja.wikipedia.org/wiki/ISO/IEC_8859-1#%E7%AC%A6%E5%8F%B7%E8%A1%A8
 *
 * そしてUnicodeの最初の256個のCode Point(U+0000..U+00FF)はLatin1と同じ内容になっている。
 * JavaScriptはUnicodeを採用しているため、JavaScriptの文脈においては「Latin1」と言ったときは、その範囲の文字を指すと考えてよい。
 * @param {Uint8Array} data 8ビット符号なし整数値の配列
 * @param {number} beginIndex Latin1でエンコードされる文字列の最初のインデックス
 * @param {number} size Latin1でエンコードされる文字列の長さ
 * @return {string} Latin1でエンコードされた文字列
 */
export function getStringLatin1(
  data: Uint8Array,
  beginIndex: number,
  size: number,
): string {
  const latin1Uint8Array = data.subarray(beginIndex, beginIndex + size);
  return String.fromCharCode.apply(null, [...latin1Uint8Array]);
}

/**
 * UTF-16文字コードでの文字テキストを取得する。
 * リトルエンディアン、ビッグエンディアン、サロゲートパエに対応している。
 * @see https://xn--ruq167cnto080a.com/media_key/3399/
 * @param {Uint8Array} data 8ビット符号なし整数値の配列
 * @param {number} beginIndex UTF-16でエンコードされる文字列の最初のインデックス
 * @param {number} size UTF-16でエンコードされる文字列の長さ
 * @return {string} UTF-16でエンコードされた文字列
 * @returns
 */
export function getStringUTF16(
  data: Uint8Array,
  beginIndex: number,
  size: number,
): string {
  const isLittleEndian =
    data[beginIndex] === HEXADECIMAL["0XFF"] &&
    data[beginIndex + 1] === HEXADECIMAL["0XFE"];
  // const isBigEndian =
  //   data[beginIndex] === HEXADECIMAL["0XFE"] &&
  //   data[beginIndex + 1] === HEXADECIMAL["0XFF"];

  const array16 = [];
  const lastIndex = size + beginIndex;
  const offset1 = isLittleEndian ? 1 : 0;
  const offset2 = isLittleEndian ? 0 : 1;

  for (let i = beginIndex; i < lastIndex; i += 2) {
    array16.push((data[i + offset1] << 8) | data[i + offset2]);
  }

  return String.fromCharCode.apply(null, array16);
}

// 符号位置（マルチバイト位置）がどの領域にあるかで表現するbyte数が変わる。
/**
 * UTF-8文字コードでの文字テキストを取得する。
 * @param {Uint8Array} data 8ビット符号なし整数値の配列
 * @param {number} beginIndex UTF-16でエンコードされる文字列の最初のインデックス
 * @param {number} size UTF-16でエンコードされた文字列
 * @returns {string} UTF-8文字コードでエンコードされた文字列
 */
export function getStringUTF8(
  data: Uint8Array,
  beginIndex: number,
  size: number,
): string {
  const array16 = [];
  const lastIndex = size + beginIndex;

  for (let i = beginIndex; i < lastIndex; ) {
    // マルチバイト文字が1byte未満
    const lessThan1Byte = data[i] < HEXADECIMAL["0x80"];
    // マルチバイト文字が2byte未満
    const lessThan2Byte =
      data[i] >= HEXADECIMAL["0xc2"] && data[i] < HEXADECIMAL["0xe0"];
    // マルチバイト文字が3byte未満
    const lessThan3Byte =
      data[i] >= HEXADECIMAL["0xe0"] && data[i] < HEXADECIMAL["0xf0"];
    // マルチバイト文字が4byte未満
    const lessThan4Byte =
      data[i] >= HEXADECIMAL["0xf0"] && data[i] < HEXADECIMAL["0xf5"];

    if (lessThan1Byte) {
      const codepoint = data[i];
      array16.push(codepoint);
      // 1byte分ずらす
      i++;
    } else if (lessThan2Byte) {
      // 2byteのシーケンスを1つのUnicodeコードポイントに変換する。
      // 下位5ビットを取り出し6ビット左にシフト、次に下位6ビットを取り出し、それらをOR演算で結合する。
      // この処理により、1つの16ビットの文字（またはUnicodeコードポイント）が再構成される。
      const codepoint =
        ((data[i] & HEXADECIMAL["0x1f"]) << 6) |
        (data[i + 1] & HEXADECIMAL["0x3f"]);
      array16.push(codepoint);

      // 2byte分ずらす
      i += 2;
    } else if (lessThan3Byte) {
      // 3byteのシーケンスを1つのUnicodeコードポイントに変換する。
      // 下位4ビットを取り出し12ビット左にシフト、次に下位6ビットを取り出し6ビット左にシフト、それらをOR演算で結合する。
      // この処理により、上位4ビット、中間6ビット、下位6ビットが1つの16ビットの整数として結合されUnicodeコードポイントを形成する。
      const codepoint =
        ((data[i] & HEXADECIMAL["0x0f"]) << 12) |
        ((data[i + 1] & HEXADECIMAL["0x3f"]) << 6) |
        (data[i + 2] & HEXADECIMAL["0x3f"]);
      array16.push(codepoint);

      // 3byte分ずらす
      i += 3;
    } else if (lessThan4Byte) {
      // 4byteのシーケンスを1つのUnicodeコードポイントに変換する。
      // 下位3ビットを取り出し18ビット左にシフト、次に下位6ビットを取り出し12ビット左にシフトする。
      // 同様に3バイト目と4バイト目も処理し、それらをOR演算で結合する。
      const codepoint =
        ((data[i] & HEXADECIMAL["0x07"]) << 18) |
        ((data[i + 1] & HEXADECIMAL["0x3f"]) << 12) |
        ((data[i + 2] & HEXADECIMAL["0x3f"]) << 6) |
        (data[i + 3] & HEXADECIMAL["0x3f"]);
      // UTF-16では、コードポイントが 0x10000 以上の場合、サロゲートペアと呼ばれる2つの16ビット値で表現する必要がある。
      // まず、0x10000 を引いて調整する。これにより、範囲が 0x0000 から 0xFFFFF になる。
      const tmp = codepoint - 0x10000;
      // 上位10ビットを取り出し、それに 0xD800 を加算（ビットOR演算）して上位サロゲートを生成する。
      const highSurrogate = (tmp >> 10) | 0xd800;
      // 下位10ビットを取り出し、それに 0xDC00 を加算（ビットOR演算）して下位サロゲートを生成する。
      const lowSurrogate = (tmp & 0x3ff) | 0xdc00;
      array16.push(highSurrogate);
      array16.push(lowSurrogate);

      // 4byte分ずらす
      i += 4;
    }
  }

  return String.fromCharCode.apply(null, array16);
}

/**
 * 引数modの値に応じてGetaを付与する
 * @param {Uint8Array} binary Base64バイナリデータ
 * @param {number} index インデックス
 * @param {number} mod Base64バイナリデータをテキストが始まるByteインデックスで割ったときの剰余
 * @returns {string[]} Geta
 */
function encodePlusGeta(
  binary: Uint8Array,
  index: number,
  mod: number,
): string[] {
  switch (mod) {
    case 1:
    case 2: {
      const equalsMod1 = mod === 1;
      const iNum = equalsMod1
        ? (binary[index] << 8) + binary[index + 1]
        : binary[index];

      return [
        equalsMod1 ? ENCODE_TABLE[iNum >> 10] : ENCODE_TABLE[iNum >> 2],
        equalsMod1
          ? ENCODE_TABLE[(iNum >> 4) & HEXADECIMAL["0x3f"]]
          : ENCODE_TABLE[(iNum << 4) & HEXADECIMAL["0x3f"]],
        equalsMod1 ? ENCODE_TABLE[(iNum << 2) & HEXADECIMAL["0x3f"]] : GETA,
        GETA,
      ];
    }
    default:
      return [];
  }
}

/**
 * Base64バイナリデータを解読可能なテキストデータに変換する
 * @see https://qiita.com/PlanetMeron/items/2905e2d0aa7fe46a36d4
 * @param {Uint8Array} binary Base64バイナリデータ
 * @returns {string} テキスト
 */
export function encodeBase64(binary: Uint8Array): string {
  if (!binary) {
    return "";
  }

  // TODO エンコードテーブルを用いてバイナリデータをエンコードしているが、
  // これだとエンコードテーブルにのみ存在する文字列しか変換できない。
  // そのため、以下の参照リンクを用いて変換する必要がありそう
  // https://developer.mozilla.org/ja/docs/Glossary/Base64#%E3%80%8Cunicode_%E5%95%8F%E9%A1%8C%E3%80%8D
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint

  const outStrArray: string[] = [];
  const length = binary.length;
  const count = Math.floor(length / NUM_OF_BYTES);
  const mod = length % NUM_OF_BYTES;

  for (let i = 0; i < count; i++) {
    const index = NUM_OF_BYTES * i;
    const indexNumber =
      (binary[index] << 16) + (binary[index + 1] << 8) + binary[index + 2];

    outStrArray.push(
      ...[
        ENCODE_TABLE[indexNumber >> 18],
        ENCODE_TABLE[(indexNumber >> 12) & HEXADECIMAL["0x3f"]],
        ENCODE_TABLE[(indexNumber >> 6) & HEXADECIMAL["0x3f"]],
        ENCODE_TABLE[indexNumber & HEXADECIMAL["0x3f"]],
      ],
    );
  }

  outStrArray.push(...encodePlusGeta(binary, NUM_OF_BYTES * count, mod));

  return outStrArray.join("");
}

/**5
 * バイナリデータの配列から引数で指定したバイト数Integerを取り出す
 * @param {Uint8Array} binary Base64バイナリデータ
 * @param {number} index インデックス
 * @param {1 | 2 | 3 | 4} byteNumber バイナリデータから取り出すバイト数
 * @param {boolean} isLittleEndian true: リトルエンディアン / false: ビッグエンディアン （byteNumberが4の時のみ計算に反映されます）
 * @returns {number} 1バイトIntegerを取り出す
 */
export function getIntNumberFromBinary(
  binary: Uint8Array,
  index: number,
  byteNumber: 1 | 2 | 3 | 4,
  isLittleEndian?: boolean,
): number {
  switch (byteNumber) {
    case 1:
      return binary[index++];
    case 2:
      return (binary[index] << 8) | binary[index + 1];
    case 3:
      return (
        (binary[index] << 16) | (binary[index + 1] << 8) | binary[index + 2]
      );
    case 4:
      return isLittleEndian
        ? binary[index] |
            (binary[index + 1] << 8) |
            (binary[index + 2] << 16) |
            (binary[index + 3] << 24)
        : (binary[index] << 24) |
            (binary[index + 1] << 16) |
            (binary[index + 2] << 8) |
            binary[index + 3];
    default:
      return 0;
  }
}

/**
 * UTF-8テキストをUTF-16テキストに変換する
 * @param utf8Text UTF-8でエンコードされているテキスト
 * @returns UTF-16でエンコードされているテキスト
 */
export function utf8ToUtf16(utf8Text: string) {
  let utf16Text = "";
  for (let i = 0; i < utf8Text.length; ) {
    const char = utf8Text.charCodeAt(i);
    if ((char & HEXADECIMAL["0xe0"]) == HEXADECIMAL["0xc0"]) {
      utf16Text += String.fromCharCode(
        ((char & HEXADECIMAL["0x1f"]) << 6) |
          (utf8Text.charCodeAt(i + 1) & HEXADECIMAL["0x3f"]),
      );
      i += 2;
    } else if ((char & HEXADECIMAL["0xf0"]) == HEXADECIMAL["0xe0"]) {
      utf16Text += String.fromCharCode(
        ((char & HEXADECIMAL["0x0f"]) << 12) |
          ((utf8Text.charCodeAt(i + 1) & HEXADECIMAL["0x3f"]) << 6) |
          (utf8Text.charCodeAt(i + 2) & HEXADECIMAL["0x3f"]),
      );
      i += 3;
    } else {
      utf16Text += utf8Text[i++];
    }
  }
  return utf16Text;
}
