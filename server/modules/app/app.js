import { dispatch } from './dispatch.js';

export class App {
	constructor() {

	}

	requestListner(req, res) {
		const statusCode = res.statusCode;
		const headers = req.headers;
		const method = req.method;
		const url = req.url;

		try {
			dispatch(url, res);
		} catch (err) {
			console.log(err);
		}
	}
}