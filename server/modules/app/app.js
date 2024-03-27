import fs from 'node:fs';
import path from 'node:path';
import { URL, URLSearchParams } from 'node:url';
import { Router } from './router.js';
import { mimeTypes } from './mimeTypes.js';

export class App {
	#cash;
	#domain;
	#clientPath;

	constructor(domain, clientPath) {
		this.#cash = {};
		this.#domain = domain;
		this.#clientPath = clientPath;

		this.listener = this.#requestListner.bind(this);
	}

	#requestListner(req, res) {
		const { method } = req;
		const [ pathname, search ] = req.url.split('?');

		console.log(`========== ${method} ==========`);
		console.log('Path:', pathname);
		console.log('Params:', search);

		switch (method) {
			case 'GET':
				this.#get(req, res);
				break;

			case 'POST':
				this.#post(req, res);
				break;

			case 'PUT':
				this.#put();
				break;

			case 'DELETE':
				this.#delete();
				break;

			default: break;
		}
	}

	// #prepareRequest(req, res, next) {
	// 	const data = [];

	// 	req.on('data', (chunk) => {
	// 		data.push(chunk);
	// 	});

	// 	req.on('end', () => {
	// 		req.body = Buffer.concat(data).toString();
	// 		console.log('Request body', req.body);

	// 		next(req, res);
	// 	});
	// }

	#get(req, res) {
		const [ pathname, search ] = req.url.split('?');
		const ext = path.extname(pathname);
		const mimeType = mimeTypes[ext] || mimeTypes['.txt'];
		const headers = {};

		let content = this.#checkCash(pathname);
		let statusCode = 200;

		if (!content) {
			statusCode = 500;
			content = 'Resource not found';
		}

		headers['Accept-Ranges'] = 'bytes';
		headers['Content-Type'] = mimeType;
		headers['Content-Length'] = Buffer.byteLength(content);

		// router.route(pathname, search, res);

		res.writeHead(statusCode, headers);
		res.end(content);
	}

	#post(req, res) {
		const [ pathname, search ] = req.url.split('?');
		const headers = {};

		const params = this.#parseSearchString(search);
		
		headers['Content-Type'] = mimeTypes['.json'];

		res.writeHead(200, headers);
		res.end(JSON.stringify(params));
	}

	#put() {
		res.end('ok');
	}

	#delete() {
		res.end('ok');
	}

	#parseSearchString(search) {
		const params = {};
		const keyValuePairs = search.split('&');

		for (let i = 0; i < keyValuePairs.length; i++) {
			const keyValuePair = keyValuePairs[i].split('=');
			params[keyValuePair[0]] = keyValuePair[1];
		}

		console.log(params);

		return params;
	}

	#checkCash(pathname) {
		if (!this.#cash[pathname]) {
			this.#updateCash(pathname);
		}

		return this.#cash[pathname];
	}

	#updateCash(pathname) {
		const filePath = this.#clientPath + pathname;
		const content = this.#readFileSync(filePath);

		if (content) {
			this.#cash[pathname] = content;
		}
	}

	#readFileAsync(filePath) {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				console.log(err);
				return undefined;
			}

			return data;
		})
	}

	#readFileSync(filePath) {
		try {
			return fs.readFileSync(filePath)
		} catch (err) {
			console.log(err);
		}
	}

	#readStream(filePath) {
		const stream = fs.createReadStream(filePath);

		stream.on('data', (data) => {
			return data;
		});

		stream.on('error', (err) => {
			console.log(err);
			return undefined;
		});
	}
}