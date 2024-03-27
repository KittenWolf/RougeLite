import URL from 'node:url';
import http from 'node:http';
import path from 'node:path';
import { App } from './modules/app/app.js';

const fileName = URL.fileURLToPath(import.meta.url);

const projectPath = path.normalize(`${path.dirname(fileName)}\\..`);
const clientPath = `${projectPath}\\client`;
// const serverPath = `${projectPath}\\server`;

const port = 5500;
const hostName = 'localhost';
const domainName = `http://${hostName}:${port}`;

const app = new App(domainName, clientPath);

const server = http.createServer(app.listener);
server.listen(port);

// app.get('/constructor', (res) => {
// 
// })

// app.get(`/constructor${searchParams}`, (res) => {
// 
// })

// app.post(`/constructor${searchParams}`, (res) => {
// 
// })