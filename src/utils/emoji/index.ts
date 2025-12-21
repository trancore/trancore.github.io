/**
 * ランダムな絵文字1文字を取得する
 *
 * @returns ランダムな絵文字1文字
 */
export function getRandomEmoji() {
  // 使う絵文字はよく使われる領域に限定
  const start = 0x1f300;
  const end = 0x1fad0;

  while (true) {
    const code = Math.floor(Math.random() * (end - start)) + start;
    const emoji = String.fromCodePoint(code);

    // 絵文字として表示できない「🣆（MISSING CHARACTER GLYPH）」は除外する。
    if (emoji !== " 🣆") {
      return emoji;
    }
  }
}
