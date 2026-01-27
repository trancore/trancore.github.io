# Portfolio サイト trancore.github.io

https://trancore-github-io.vercel.app/

## 技術スタック

| 使用ライブラリ/フレームワーク | 説明 |
| --- | --- |
| vite | ビルドツール |
| TypeScript | 静的型付け言語 |
| Biome | フォーマッタ、リンタ |
| React | JavaScript ライブラリ |
| tailwindCSS | CSS フレームワーク |
| Headless UI | アクセシブルな UI コンポーネント |
| Storybook | コンポーネントのデザインカタログ |
| tanstack router | React, Solid アプリケーション用型安全ルーティングエコシステム |
| tanstack query | データフェッチと同期的な状態管理ライブラリ |
| vite | 単体テストツールライブラリ |

## 環境変数について

| 環境変数名 | 説明 |
| --- | --- |
| `REACT_APP_GITHUB_ACCESS_TOKEN_KEY` | GitHubのアクセストークンキー。リポジトリの情報を取得するために必要。 |

## 「最近読んだ記事」「読んだ本」の取得手順

1. `scripts/getURLMetadata.ts`の`inputPath`, `outputPath`を変更する。
2. それぞれの定数ファイルにNoとurlを更新する。
3. そのほかの値は空文字列に設定する。
4. `node ./scripts/getURLMetadata.ts`を実行して、metadataを取得する。
5. 完了
