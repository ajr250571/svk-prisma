import { loginUser } from '$lib/auth';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();

	try {
		const { user, token } = await loginUser(username, password);

		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 // 1 hora
		});

		return json({ success: true, user });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return json({ success: false, error: message }, { status: 401 });
	}
}
