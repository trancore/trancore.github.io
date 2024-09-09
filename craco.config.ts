import { resolve as _resolve } from "path";
import TerserPlugin from "terser-webpack-plugin";

module.exports = {
  typescript: {
    enableTypeChecking: true,
  },
  webpack: {
    alias: {
      "~": _resolve(__dirname, "./src/"),
    },
    configure: {
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    },
  },
};
