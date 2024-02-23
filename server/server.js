import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { handler } from '../build/handler.js';

/**
 * Express application instance.
 * @type {express.Express}
 */
const app = express();

/**
 * HTTP server wrapping the Express app.
 * @type {import('http').Server}
 */
const httpServer = createServer(app);

/**
 * Socket.IO server instance.
 * @type {SocketIOServer}
 */
const io = new SocketIOServer(httpServer);

/**
 * Port on which the server listens.
 * @type {string | number}
 */
const PORT = process.env.PORT || 3000;

/**
 * Handles Socket.IO client connections.
 */
io.on('connection', (socket) => {
	console.log('a user connected');

	/**
	 * Event listener for client disconnection.
	 */
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	/**
	 * Custom event listener.
	 * @param {string} msg - Message received from the client.
	 */
	socket.on('example_event', (msg) => {
		console.log('message: ' + msg);
		socket.emit('example_event', 'Hello from the server!');
	});
});

app.use(handler);

/**
 * Starts the HTTP server listening on the specified port.
 */
httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

/**
 * Endpoint for health check.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.get('/healthcheck', (req, res) => {
	console.log(`Received healthcheck request`);
	res.end('OK');
});

/**
 * Middleware to log all incoming requests.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - Callback to the next middleware.
 */
app.use((req, res, next) => {
	console.log(`Received request for ${req.url}`);
	next();
});
