/** biome-ignore-all lint/suspicious/noExplicitAny: このファイルではanyを許容 */

import fs from "node:fs";

import * as cheerio from "cheerio";

const __dirname = new URL("..", import.meta.url).pathname;
// 入力ファイルを設定する
const inputPath = `${__dirname}src/consts/books.json`;
// 出力ファイルを設定する
const outputPath = `${__dirname}src/consts/books_result.json`;

// JSONファイルを読み込む
const fileContent = fs.readFileSync(inputPath, "utf-8");
const jsons = JSON.parse(fileContent);

/**
/**
 * 指定された記事オブジェクトのURLからOGPメタデータ(title, description, image)を取得します。
 *
 * @param {any} article - メタデータを取得する記事情報（少なくとも `url` と `No` プロパティを含むオブジェクト）
 * @returns {Promise<{ No: string, url: string, title: string, description: string, image: string }>} メタデータを格納したオブジェクト
 */
async function fetchMetadata(article: any): Promise<{
  No: string;
  url: string;
  title: string;
  description: string;
  image: string;
}> {
  try {
    const res = await fetch(article.url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const title =
      $("meta[property='og:title']").attr("content") || $("title").text() || "";

    const description =
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='description']").attr("content") ||
      "";

    const image =
      $("meta[property='og:image']").attr("content") ||
      $("meta[name='twitter:image']").attr("content") ||
      "";

    return {
      No: article.No,
      url: article.url,
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
    };
  } catch (e) {
    return {
      No: article.No,
      url: article.url,
      title: "",
      description: "",
      image: "",
    };
  }
}

/**
 * メイン処理: 入力JSONから記事ごとにメタデータを収集し出力ファイルに保存します。
 *
 * - 入力: inputPathで指定されたJSONファイル。記事リスト。
 * - 出力: outputPathで指定されたJSONファイル。各記事のURL・タイトル・ディスクリプション・画像付き。
 *
 * fetchMetadata関数で各記事URLからメタデータ（OGP等）を取得し整形します。
 * 取得失敗時は空の値を返します。
 * 1件ごとに500msスリープし、アクセス集中を回避します。
 */
async function main() {
  const results = [];

  for (const json of jsons) {
    console.log(`fetching: ${json.No}`);
    const data = await fetchMetadata(json);
    results.push(data);

    // アクセス集中回避
    await new Promise((r) => setTimeout(r, 500));
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");

  console.log("done:", outputPath);
}

main();
