/** 16進数 */
const HEXADECIMAL = {
  "0x07": 0x07,
  "0x0f": 0x0f,
  "0x1f": 0x1f,
  "0x3f": 0x3f,
  "0x80": 0x80,
  "0xc2": 0xc2,
  "0xe0": 0xe0,
  "0xf0": 0xf0,
  "0xf5": 0xf5,
  "0XFE": 0xfe,
  "0XFF": 0xff,
};

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
function getStringLatin1(
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
function getStringUTF16(
  data: Uint8Array,
  beginIndex: number,
  size: number,
): string {
  const isLittleEndian =
    data[beginIndex] === HEXADECIMAL["0XFF"] &&
    data[beginIndex + 1] === HEXADECIMAL["0XFE"];
  const isBigEndian =
    data[beginIndex] === HEXADECIMAL["0XFE"] &&
    data[beginIndex + 1] === HEXADECIMAL["0XFF"];

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
function getStringUTF8(
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
