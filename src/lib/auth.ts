import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '$lib/server/prisma';

const JWT_SECRET =
	process.env.JWT_SECRET || '2adf12c3b7c236b5eff577db36a9a39f09fa865e962e69ea387aac2efac04992'; // Asegúrate de definir esta variable de entorno
const SALT_ROUNDS = 10;

export async function createUser(username: string, email: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
	return await prisma.user.create({
		data: {
			username,
			email,
			password: hashedPassword
		}
	});
}

export async function loginUser(username: string, password: string) {
	const user = await prisma.user.findUnique({ where: { username } });

	if (!user) {
		throw new Error('Usuario no encontrado');
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		throw new Error('Contraseña incorrecta');
	}

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

	return { user, token };
}

export async function verifyToken(token: string) {
	// Verificar si el token está en la lista negra
	const isInvalidated = await prisma.invalidatedToken.findUnique({
		where: { token }
	});

	if (isInvalidated) {
		throw new Error('Token invalidado');
	}

	// Resto de la verificación JWT normal
	return jwt.verify(token, JWT_SECRET);
}
