/**
 * 秒数を"MM:SS"に変換する
 * @param {number} seconds 秒
 * @returns {string} MM:SS
 */
export function formatSecondsToMMSS(seconds: number): string {
  // 秒を整数化
  const roundSeconds = Math.floor(seconds);
  // 分を取得
  const minutes = Math.floor(roundSeconds / 60);
  // 残りの秒数を取得
  const remainingSeconds = roundSeconds % 60;
  // 秒数が1桁の場合は先頭に0を追加
  const formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  // 分を3桁にフォーマット
  const formattedMinutes = String(minutes).padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
