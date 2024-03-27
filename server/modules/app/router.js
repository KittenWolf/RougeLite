export class Router {
	#app;
	#routes = {
		'/': handler(),
		'/constructor': handler(),
		'/contructor?map-name&map-width&map-height': handler()
	}

	constructor() {	}

	route(url, res) {
		switch (url) {
			case '/': break;
			case '/constructor': break;
		
			default:
				break;
		}
	}
}
