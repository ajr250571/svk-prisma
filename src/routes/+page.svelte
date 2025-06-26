<script lang="ts">
	import axios from 'axios';

	export let data;
	const { users, user } = data;

	async function handlerLogout() {
		try {
			const response = await axios.post('/api/auth/logout');
			const data = response.data;
			if (data.success) {
				window.location.href = '/login'; // Redirect to login page
			} else {
				console.error('Logout failed');
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	}
</script>

<div class="flex h-screen flex-col items-center justify-center gap-3">
	<h1 class="text-3xl font-bold">Bienvenido a SvelteKit</h1>
	<p>Visite svelte.dev/docs/kit para leer la documentacion y aprender más sobre SvelteKit.</p>
	<button on:click={handlerLogout} class="btn btn-primary">Logout</button>
	<p>Username login: {user?.username}</p>
	{#each users as user}
		<h2 class="text-2xl font-semibold">{user.username}</h2>
		<p class="text-lg">{user.email}</p>
		<!-- content here -->
	{/each}
</div>
