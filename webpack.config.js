var path = require("path");

module.exports = {
  entry: ["webpack/hot/dev-server", path.resolve(__dirname, "src/js/index.jsx")],
  output: {
    path: path.resolve(__dirname, "www"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ["react-hot","jsx-loader"] },
      { test: /\.json/, loader: "json-loader" },
      { test: /\.css/, loader: "style!css" },
      { test: /\.less/, loader: "style!css!less" },
      { test: /\.scss/, loader: "style!css!sass?sourceMap" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
};
