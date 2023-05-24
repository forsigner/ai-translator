const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: [],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    // esmExternals: 'loose'
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  }
};
