import { describe, expect, it } from "vitest";
import { getRandomEmoji } from "./index";

describe("getRandomEmoji", () => {
  it("1文字の文字列を返すこと", () => {
    const emoji = getRandomEmoji();
    expect(typeof emoji).toBe("string");
    expect([...emoji].length).toBe(1); // サロゲートペアも考慮して配列化して長さを確認
  });

  it("指定された絵文字の範囲内の文字を返すこと", () => {
    // ランダムのため複数回テスト
    for (let i = 0; i < 20; i++) {
      const emoji = getRandomEmoji();
      const codePoint = emoji.codePointAt(0) ?? 0;
      expect(codePoint).toBeGreaterThanOrEqual(0x1f300);
      expect(codePoint).toBeLessThanOrEqual(0x1fad0);
    }
  });

  it("欠損文字グリフ（🣆）を返さないこと", () => {
    // 🣆 のコードポイントはU+1F846（16進で0x1F846）
    for (let i = 0; i < 50; i++) {
      const emoji = getRandomEmoji();
      expect(emoji).not.toBe("🣆");
    }
  });
});
