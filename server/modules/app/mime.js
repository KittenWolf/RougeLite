import path from 'node:path';

export const mimeTypes = Object.freeze({
	'.txt': 'text/plain',

	'.js': 'application/javascript',
	'.json': 'application/json',

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
});

export function getMime(pathname) {	
	const ext = path.extname(pathname);	
	return mimeTypes[ext] || mimeTypes['.txt'];
}