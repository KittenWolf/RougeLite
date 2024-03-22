import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const fileName = fileURLToPath(import.meta.url);

const projectDir = path.normalize(`${path.dirname(fileName)}\\..\\..\\..`);
const clientDir = `${projectDir}\\client`;
const serverDir = `${projectDir}\\server`;

const mimeTypes = {
	'.default': 'text/plain',

	'.js': 'application/javascript',

	'.html': 'text/html',
	'.css': 'text/css',

	'.ico': 'image/x-icon',
	'.jpg': 'image/jpeg',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',

	'.otf': 'font/otf',
	'.ttf': 'font/ttf',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
}

export function dispatch(url, res) {
	if (url === '/') {
		url += 'index.html';
	}

	const { name, ext } = path.parse(url);

	let filePath = clientDir;
	filePath += (ext === '.html') ? `\\views${url}` : url;

	if (!mimeTypes[ext]) {
		res.writeHead(500);
		console.log(`${ext} is doesn't exist in memetypes`);
		res.end(`MemeType error.`);
	}

	fs.readFile(filePath, function (error, content) {
		if (error) {
			res.writeHead(500);			
			console.log(`Can't read '${name}${ext}' file.`);
			res.end(`Can't read file.`);
		} else {
			res.writeHead(200, { 'Content-Type': mimeTypes[ext] });
			res.end(content, 'utf-8');
		}
	});
}