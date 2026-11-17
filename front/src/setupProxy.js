const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function setupProxy(app) {
  app.use(createProxyMiddleware('/api', {
    target: process.env.CV_API_TARGET || 'http://127.0.0.1:19391',
  }))
}
