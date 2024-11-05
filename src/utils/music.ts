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
      // FIXME 8じゃなくて16の方が良い？？？
      const uint8ArrayResult = new Uint8Array(result);
      return resolve(uint8ArrayResult);
    };
    fileReader.onerror = () => {
      return reject(new Error("File reading failed"));
    };
  });
}

/**
 * 音楽メタタグ情報の読み込み
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
