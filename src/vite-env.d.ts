/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg?react" {
  import type * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

interface ViteTypeOptions {
  // ImportMetaEnv の型を厳密にし、不明なキーを許可しない
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_GITHUB_ACCESS_TOKEN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
