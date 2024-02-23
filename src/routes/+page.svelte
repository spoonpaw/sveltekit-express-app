<script lang="ts">
	import { onMount } from 'svelte';
	import { io, Socket } from 'socket.io-client';

	let socket: Socket;

	onMount(() => {
		// Specify the connection URL and optionally any options
		socket = io('http://localhost:3000');

		socket.on('connect', () => {
			console.log('connected to server');

			// Listen for events from the server
			socket.on('example_event', (msg: string) => {
				console.log(msg);
			});

			// Emit events to the server
			socket.emit('example_event', 'Hello from the client!');
		});
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

