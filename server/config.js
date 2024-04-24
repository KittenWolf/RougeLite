import URL from 'node:url';
import path from 'node:path';

const __fileName = URL.fileURLToPath(import.meta.url);

export const __projectPath = path.normalize(`${path.dirname(__fileName)}\\..`);
export const __clientPath = `${__projectPath}\\client`;
export const serverPath = `${__projectPath}\\server`;

export const __port = 5500;
export const __hostName = 'localhost';
export const __domainName = `http://${__hostName}:${__port}`;