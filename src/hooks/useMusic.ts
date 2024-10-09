/**
 * 音楽そのものを取り扱うためのhooks
 */
export default function useMusic() {
  /**
   * 音楽のBinary Dataを取得
   * @param {File} file 音楽ファイル
   * @returns {Promise<string | ArrayBuffer | null>} Binary Data
   */
  function getAudioArrayBuffer(
    file: File,
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = function () {
        const result = fileReader.result;
        resolve(result);
      };
      fileReader.onerror = () => {
        reject(new Error("File reading failed"));
      };
    });
  }

  /**
   * 音楽メタタグ情報の読み込み
   * @param {HTMLAudioElement} audioElement 音楽要素
   * @returns {number} （今のところ）再生時間
   */
  function loadedAudioMetadata(
    audioElement: HTMLAudioElement,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      audioElement.addEventListener("loadedmetadata", () => {
        const { duration } = audioElement;
        resolve(duration);
      });
    });
  }
  return {
    getAudioArrayBuffer,
    loadedAudioMetadata,
  };
}
