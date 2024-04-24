import { mimeTypes } from "../mime.js";

export default function post(req, res) {
	const params = req.params;
	
	res.writeHead(200, {		
		'Content-Type': mimeTypes['.json'],
	});
	res.end(JSON.stringify(params));
}