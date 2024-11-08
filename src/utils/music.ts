/**
 * 音楽のBinary Dataを取得
 * @param {File} file 音楽ファイル
 * @returns {Promise<string | ArrayBuffer | null>} Binary Data
 */
export function getAudioUint8Array(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = function () {
      const result = fileReader.result;
      if (result === null || typeof result === "string") {
        return reject(new Error("File reading failed"));
      }
      const uint8ArrayResult = new Uint8Array(result);
      return resolve(uint8ArrayResult);
    };
    fileReader.onerror = () => {
      return reject(new Error("File reading failed"));
    };
  });
}

/**
 * UTF-8コード文字配列の画像データを取得する
 * @param musicData UTF-8文字コード配列の音楽データ
 * @param beginIndex 画像データの始まりのインデックス
 * @param size 画像データサイズ
 * @returns {Uint8Array} UTF-8コード文字配列の画像データ
 */
export function getImageInUint8Array(
  musicData: Uint8Array,
  beginIndex: number,
  size: number,
): Uint8Array {
  return musicData.subarray(beginIndex, beginIndex + size);
}

/**
 * 音楽メタタグ情報の読み込み
 * TODO この関数を見直す
 * @param {HTMLAudioElement} audioElement 音楽要素
 * @returns {number} （今のところ）再生時間
 */
export function loadedAudioMetadata(
  audioElement: HTMLAudioElement,
): Promise<number> {
  return new Promise((resolve) => {
    audioElement.addEventListener("loadedmetadata", () => {
      const { duration } = audioElement;
      resolve(duration);
    });
  });
}
