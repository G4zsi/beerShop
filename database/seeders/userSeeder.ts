import { createSimpleUser } from '../factories/userFactory';

export {
	seedUsers
};

async function seedUsers(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createSimpleUser();
	}
}