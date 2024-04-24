import http from 'node:http';

import { App } from './modules/app/app.js';
import { __port } from './config.js';

const app = new App();

const server = http.createServer(app.listener);
server.listen(__port);

// const constructor = new Router();
// app.use('/constructor', constructor);

// cosntructor.get('/', (res) => {
// 	return static sources;
// });

// constructor.get(`/:mapId`, (res) => {
// 	return json(map);
// });

// constructor.post(`/:getSceneLayout`, (res) => {
// 	return json(sceneLayout);
// });
