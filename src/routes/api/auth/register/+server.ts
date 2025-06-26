import { createUser } from '$lib/auth';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { username, email, password } = await request.json();

	try {
		const user = await createUser(username, email, password);
		return json({ success: true, user }, { status: 201 });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return json({ success: false, error: message }, { status: 400 });
	}
}
