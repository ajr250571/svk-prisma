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
				<label class="label mb-2" for="password">
					<span class="label-text">Usuario</span>
				</label>
				<input
					type="text"
					class="input validator input-primary input-bordered w-full"
					required
					placeholder="Username"
					pattern="[A-Za-z][A-Za-z0-9\-]*"
					minlength="3"
					maxlength="30"
					title="Solo letras, números y guiones"
					bind:value={username}
				/>
				<p class="validator-hint">Entre 3 y 30 caracteres. Solo letras, números y guiones</p>
			</div>
			<div class="form-control">
				<label class="label mb-2" for="email">
					<span class="label-text">Correo electrónico</span>
				</label>
				<input
					class="input validator input-primary input-bordered w-full"
					type="email"
					required
					placeholder="mail@site.com"
					bind:value={email}
				/>
				<div class="validator-hint">Ingrese un email valido.</div>
			</div>
			<div class="form-control">
				<label class="label mb-2" for="password">
					<span class="label-text">Contraseña</span>
				</label>
				<input
					type="password"
					class="input validator input-primary input-bordered w-full"
					required
					placeholder="Password"
					minlength="8"
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*"
					title="Debe tener al menos 8 caracteres, incluyendo un número, una letra minúscula y una letra mayúscula"
					bind:value={password}
				/>
				<p class="validator-hint">
					Debe tener por lo menos 8 caracteres. Al menos un numero, una letra mayuscula y una
					minuscula.
				</p>
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
