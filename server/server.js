// server/server.ts
import express from 'express';
import { handler } from '../build/handler.js';

const app = express();
const PORT = process.env.PORT || 3000;
console.log(`Server is running at http://localhost:${PORT}`);

// Log when the server starts listening
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

// Optional: Serve static files - SvelteKit does this for you, but you can add custom static file handling if needed
// app.use(express.static('static'));

// Log requests to /healthcheck
app.get('/healthcheck', (req, res) => {
	console.log(`Received healthcheck request`);
	res.end('OK');
});

// Log all other requests
app.use((req, res, next) => {
	console.log(`Received request for ${req.url}`);
	next();
});

// Use the SvelteKit handler to handle all other requests
app.use(handler);
