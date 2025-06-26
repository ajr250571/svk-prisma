import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const users = await locals.prisma.user.findMany();
	return { users, user: locals.user };
}) satisfies PageServerLoad;
