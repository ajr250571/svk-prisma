// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		interface Locals {
			prisma: PrismaClient;
			user?: {
				id: string;
				username: string;
				email: string;
				// Agrega otros campos necesarios
			};
		}
	}
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface PageState {}
	// interface Platform {}
}

export {};
