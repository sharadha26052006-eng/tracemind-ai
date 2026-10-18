const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function safePath(urlPath) {
  const pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  if (pathname === '/manus-routes.json') return path.join(root, 'public', 'manus-routes.json');
  const candidate = path.resolve(root, relative);
  return candidate.startsWith(root) ? candidate : path.join(root, 'index.html');
}

function handleRequest(req, res) {
  const filePath = safePath(req.url);
  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === 'ENOENT' && (req.headers.accept || '').includes('text/html')) {
        fs.readFile(path.join(root, 'index.html'), (fallbackError, fallbackData) => {
          if (fallbackError) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('TraceMind server error');
            return;
          }
          res.writeHead(200, { 'Content-Type': types['.html'] });
          res.end(fallbackData);
        });
        return;
      }
      res.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error.code === 'ENOENT' ? 'Not found' : 'TraceMind server error');
      return;
    }
    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': types[extension] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}

module.exports = handleRequest;

if (require.main === module) {
  const server = http.createServer(handleRequest);
  server.listen(port, '0.0.0.0', () => {
    console.log(`TraceMind AI listening on http://0.0.0.0:${port}`);
  });
}
