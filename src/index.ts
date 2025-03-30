import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const port: number = parseInt(process.env.PING_LISTEN_PORT || '3000', 10);

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const url: string = req.url || '';
  const method: string = req.method || '';

  if (url === '/ping' && method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    
    res.end(JSON.stringify(req.headers));
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});