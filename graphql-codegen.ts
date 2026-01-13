import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "src/graphql/github/schema.docs.graphql": {},
    },
  ],
  /** クエリ保存場所 */
  documents: "src/graphql/github/**/*.graphql",
  /** 生成先パス */
  generates: {
    "src/graphql/github/query-generated/": {
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true
      }
    },
  },
};

export default config;
