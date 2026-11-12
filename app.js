require('dotenv').config()
const express = require('express');
const proxy = require('express-http-proxy');
const history = require('connect-history-api-fallback');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');

const port = process.env.VITE_PORT;
const app = express();

// gzip/brotli responses; the JS bundles are several times smaller compressed
app.use(compression())

app.use(express.json())
app.use(express.urlencoded())

// enable history, always rewire to index.html
app.use(history({
  verbose: true
}))

// specify directory of the static webpages (bundle.js, index.html)
const staticPath = path.join(__dirname, 'build')
// Vite puts a content hash in asset names, so those can be cached forever.
// Unhashed files (index.html, locales, favicon) must be revalidated so a new
// deploy is picked up.
const hashedAsset = /-[A-Za-z0-9_-]{8}\.[a-z0-9]+$/
app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    const isHashed = path.dirname(filePath) === staticPath && hashedAsset.test(filePath)
    res.setHeader('Cache-Control', isHashed ? 'public, max-age=31536000, immutable' : 'no-cache')
  }
}));

// hide info telling it is an express app, to avoid express-specified attack
app.disable('x-powered-by');

// set up HTTP headers properly
app.use(helmet());

// start http application
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
