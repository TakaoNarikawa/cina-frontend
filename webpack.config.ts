import { Configuration } from "webpack";
import path from "path";

const config: Configuration = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
};

export default config;
