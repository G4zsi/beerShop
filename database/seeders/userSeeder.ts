import { createSimpleUser, createTestUsers } from '../factories/userFactory';

export {
	seedUsers,
	seedTestUsers
};

async function seedUsers(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createSimpleUser();
	}
}

async function seedTestUsers() {
	await createTestUsers();
}