<script>
	import axios from 'axios';

	let username = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin() {
		loading = true;
		error = '';
		try {
			const response = await axios.post('/api/auth/login', {
				username,
				password
			});
			const data = response.data;
			if (data.success) {
				// Redirigir al dashboard o página principal
				window.location.href = '/';
			} else {
				error = data.error;
			}
		} catch (err) {
			error = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center">
	<div class="bg-base-100 w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg">
		<h1 class="text-center text-2xl font-bold">Iniciar sesión</h1>
		{#if error}
			<div class="alert alert-error shadow-lg">
				<span>{error}</span>
			</div>
		{/if}
		<form class="space-y-4" on:submit|preventDefault={handleLogin}>
			<div class="form-control">
				<label class="label mb-2" for="password">
					<span class="label-text">Usuario</span>
				</label>
				<input
					type="text"
					class="input input-primary input-bordered w-full"
					required
					placeholder="Username"
					bind:value={username}
				/>
			</div>

			<div class="form-control">
				<label class="label mb-2" for="password">
					<span class="label-text">Contraseña</span>
				</label>
				<input
					type="password"
					class="input input-primary input-bordered w-full"
					required
					placeholder="Password"
					bind:value={password}
				/>
			</div>

			<button type="submit" class="btn btn-primary w-full" disabled={loading}>
				{loading ? 'Cargando...' : 'Iniciar sesión'}
			</button>
		</form>

		<p class="text-center">
			¿No tienes cuenta?
			<a href="/register" class="link link-primary">Regístrate</a>
		</p>
	</div>
</div>
