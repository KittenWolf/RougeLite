import get from './CRUD/get.js';
import post from './CRUD/post.js';

export class App {
	constructor() {
		this.listener = this.#requestListner.bind(this);
	}

	#requestListner(req, res) {
		switch (req.method) {
			case 'GET':
				this.#prepareRequest(req, res, get);
				break;

			case 'POST':
				this.#prepareRequest(req, res, post);
				break;

			case 'PUT': break;
			case 'DELETE': break;
			default: break;
		}
	}

	#prepareRequest(req, res, next) {
		const [ pathname, search ] = req.url.split('?');
		const data = [];

		req.on('data', (chunk) => {
			data.push(chunk);
		});

		req.on('end', () => {
			req.body = Buffer.concat(data).toString();
			req.pathname = pathname;
			req.params = this.#parseSearchString(search);

			next(req, res);
		});
	}

	#parseSearchString(search) {
		const params = {};
		
		if (!search) return params;
		
		const keyValuePairs = search.split('&');

		for (let i = 0; i < keyValuePairs.length; i++) {
			const keyValuePair = keyValuePairs[i].split('=');
			params[keyValuePair[0]] = keyValuePair[1];
		}

		return params;
	}
}