<script>
	import axios from 'axios';

	let username = '';
	let email = '';
	let password = '';

	let error = '';
	let loading = false;

	async function handleRegister() {
		loading = true;
		error = '';
		try {
			const response = await axios.post('/api/auth/register', {
				username,
				email,
				password
			});
			const data = response.data;
			if (data.success) {
				const isConnect = (
					await axios.post('/api/auth/login', {
						username,
						password
					})
				).data;
				if (isConnect.success) {
					window.location.href = '/';
				} else {
					error = isConnect.error;
				}
			} else {
				error = data.error;
			}
		} catch (err) {
			error = 'Error al conectar con el servidor';
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center">
	<div class="bg-base-100 w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg">
		<h1 class="text-center text-2xl font-bold">Registrarse</h1>
		{#if error}
			<div class="alert alert-error shadow-lg">
				<span>{error}</span>
			</div>
		{/if}
		<form class="space-y-4" on:submit|preventDefault={handleRegister}>
			<div class="form-control">
				<label class="label" for="username">
					<span class="label-text">Usuario</span>
				</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					required
					class="input input-primary input-bordered mt-2 w-full"
				/>
			</div>
			<div class="form-control">
				<label class="label" for="email">
					<span class="label-text">Correo electrónico</span>
				</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="input input-primary input-bordered mt-2 w-full"
				/>
			</div>
			<div class="form-control">
				<label class="label" for="password">
					<span class="label-text">Contraseña</span>
				</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="input input-primary input-bordered mt-2 w-full"
				/>
			</div>

			<button type="submit" class="btn btn-primary w-full" disabled={loading}>
				{loading ? 'Cargando...' : 'Registrarse'}
			</button>
		</form>

		<p class="text-center">
			¿tienes cuenta?
			<a href="/login" class="link link-primary">Iniciar Sesión</a>
		</p>
	</div>
</div>
