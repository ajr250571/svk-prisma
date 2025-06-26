// src/routes/api/auth/logout/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ cookies, locals }) => {
	const token = cookies.get('session');

	if (token && locals.user?.id) {
		// Opción 1: Agregar token a una lista negra
		await prisma.invalidatedToken.create({
			data: {
				token,
				userId: locals.user.id,
				invalidatedAt: new Date(),
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // expires in 24 hours
			}
		});

		// Opción 2: Actualizar el usuario para invalidar todos los tokens anteriores
		// await prisma.user.update({
		//   where: { id: locals.user.id },
		//   data: { tokenVersion: { increment: 1 } }
		// });
	}

	cookies.delete('session', { path: '/' });
	return json({ success: true });
};
