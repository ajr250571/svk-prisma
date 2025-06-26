// src/hooks.server.ts
import { prisma } from '$lib/server/prisma';
import { verifyToken } from '$lib/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Asignar Prisma a event.locals
	event.locals.prisma = prisma;

	const session = event.cookies.get('session');

	const unprotectedRoutes = ['/login', '/register', '/api/auth'];

	// Si no es una ruta desprotegida, verifica la autenticación
	if (!unprotectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		if (!session) {
			throw redirect(303, '/login');
		}

		try {
			const decoded = verifyToken(session) as { userId: string };

			// Obtener el usuario de la base de datos
			const user = await prisma.user.findUnique({
				where: { id: decoded.userId },
				select: {
					id: true,
					username: true,
					email: true
					// Solo seleccionar los campos necesarios
				}
			});

			if (user) {
				event.locals.user = {
					id: user.id,
					username: user.username,
					email: user.email
				};
			}
		} catch {
			event.cookies.delete('session', { path: '/' });
			throw redirect(303, '/login');
		}
	}

	// Continuar con la solicitud
	const response = await resolve(event);

	return response;
};
