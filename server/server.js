import http from 'node:http';
import { App } from './modules/app/app.js';
import path from 'node:path';

const port = 5500;
const hostName = 'localhost';
const domainName = `http://${hostName}:${port}`;

const app = new App();

const server = http.createServer(app.requestListner);
server.listen(port);
