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
	<h1>User login:</h1>
	<h2 class="text-2xl font-semibold">{user?.username}</h2>
	<p class="text-lg">{user?.email}</p>
	<br />

	<ul class="list bg-base-100 rounded-box shadow-md">
		<li class="p-4 pb-2 text-sm tracking-wide opacity-60">Lista de Usuarios</li>

		{#each users as user, index}
			<!-- content here -->
			<li class="list-row">
				<div class="text-4xl font-thin tabular-nums opacity-30">{index + 1}</div>

				<div class="list-col-grow">
					<div>{user?.username}</div>
					<div class="text-xs font-semibold opacity-60">{user?.email}</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
