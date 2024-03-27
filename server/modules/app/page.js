export class Page {
	#url = '';
	#content = '';

	constructor(url) {
		this.#url = url;
	}

	loadPage() {
		const stream = fs.createReadStream(filePath, 'utf8');

		stream.on('data', (data) => {

		});

		stream.on('error', (err) => {

		});
	}

	loadStatic() {
		const stream = fs.createReadStream(filePath, 'utf8');

		stream.on('data', (data) => {

		});

		stream.on('error', (err) => {

		});
	}
}