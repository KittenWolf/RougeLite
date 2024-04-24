import fs from 'node:fs';

import { __clientPath } from "../../config.js";

export class Cash {
	#cash;

	constructor() {
		this.#cash = {};
	}

	checkCash(pathname) {
		if (!this.#cash[pathname]) {
			this.#updateCash(pathname);
		}

		return this.#cash[pathname];
	}

	#updateCash(pathname) {
		const filePath = __clientPath + pathname;
		const content = this.#readFileSync(filePath);

		if (content) {
			this.#cash[pathname] = content;
		}
	}

	#readFileSync(filePath) {
		try {
			return fs.readFileSync(filePath)
		} catch (err) {
			console.log(err);
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