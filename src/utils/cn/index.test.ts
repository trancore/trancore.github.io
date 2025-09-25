import { describe, expect, it } from "vitest";
import { cn } from "./index";

describe("cn", () => {
  it("基本の文字列をスペース区切りで結合する", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("オブジェクトの条件を解釈して結合する", () => {
    expect(cn("a", { b: true, c: false })).toBe("a b");
  });

  it("falsy 値を無視する", () => {
    // clsx は null/undefined/false/0/"" を無視する
    expect(
      cn(
        "a",
        null as unknown as string,
        undefined,
        false,
        0 as unknown as string,
        "",
      ),
    ).toBe("a");
  });

  it("入れ子配列を展開して結合する", () => {
    expect(cn(["a", ["b"]], "c")).toBe("a b c");
  });

  it("tailwind-merge によりユーティリティクラスの競合を後勝ちでマージする", () => {
    // 同一グループ (px-*) の後勝ち
    expect(cn("px-2", "px-4")).toBe("px-4");
    // text-* の後勝ち
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    // variant の後勝ち
    expect(cn("hover:text-red-500", "hover:text-blue-500")).toBe(
      "hover:text-blue-500",
    );
  });
});
