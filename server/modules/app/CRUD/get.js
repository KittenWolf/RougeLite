import { getMime } from "../mime.js";
import { Cash } from "../cash.js";

const cash = new Cash();

export default function get(req, res) {
	const pathname = req.pathname;
	
	let content = cash.checkCash(pathname);
	let statusCode = 200;
	
	if (!content) {
		statusCode = 500;
		content = 'Resource not found';
	}

	res.writeHead(statusCode, {
		'Accept-Ranges': 'bytes',
		'Content-Type': getMime(pathname),
		'Content-Length': Buffer.byteLength(content)
	});
	res.end(content);
}