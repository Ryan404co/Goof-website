// Phusion Passenger support — must be configured before loading the app
if (typeof PhusionPassenger !== 'undefined') {
	PhusionPassenger.configure({ autoInstall: false });
}

async function start() {
	await import('dotenv/config');
	const http = require('http');
	const { handler } = await import('./build/handler.js');

	const server = http.createServer((req, res) => {
		handler(req, res, () => {
			res.writeHead(404);
			res.end('Not found');
		});
	});

	const port = typeof PhusionPassenger !== 'undefined' ? 'passenger' : (process.env.PORT || 3000);
	server.listen(port, () => {
		console.log(`Server running on ${port}`);
	});
}

start().catch((err) => {
	console.error('Failed to start server:', err);
	process.exit(1);
});
