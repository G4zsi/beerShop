import {faker} from '@faker-js/faker';
import { User } from '../models/userModel';
import { genderTypes } from '../../utils/dbValues/userValues';

export {
	createSimpleUser,
	createManagerUser,
	createAdminUser,
	createTestUsers
};

async function createSimpleUser() {
	const user = await new User({
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		gender: faker.helpers.arrayElement(genderTypes),
		email: faker.internet.email(),
		role: 'customer',
		phoneNumber: faker.phone.number(),
		password: 'Pwd-123456',
		passwordAgain: 'Pwd-123456',
		birthday: faker.date.birthdate(),
		newsLetter: faker.datatype.boolean(),
		zipCode: faker.number.int({min: 1000, max: 9999}),
		city: faker.location.city(),
		address: faker.location.streetAddress(),
		billingZipCode: faker.number.int({min: 1000, max: 9999}),
		billingCity: faker.location.city(),
		billingAddress: faker.location.streetAddress(),
	});

	await User.create(user);
}

async function createManagerUser() {
	const user = await new User({
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		gender: faker.helpers.arrayElement(genderTypes),
		email: faker.internet.email(),
		role: 'manager',
		phoneNumber: faker.phone.number(),
		password: 'Pwd-123456',
		passwordAgain: 'Pwd-123456',
		birthday: faker.date.birthdate(),
	});

	await User.create(user);
}

async function createAdminUser(gender?: string, phoneNumber?: string, birthday?: Date) {
	const user = await new User({
		firstName: 'admin',
		lastName: 'admin',
		gender: faker.helpers.arrayElement(genderTypes),
		email: 'admin@admin.hu',
		role: 'admin',
		phoneNumber: !phoneNumber ? faker.phone.number() : phoneNumber,
		password: 'Pwd-123456',
		passwordAgain: 'Pwd-123456',
		birthday: !birthday ? faker.date.birthdate() : birthday
	});

	await User.create(user);
}

async function createTestUsers() {
	await createAdminUser('Male', '+3620121212', new Date(1980, 3, 3));

	for(let i = 0; i < 20; i++) {
		const user = await new User({
			firstName: 'User',
			lastName: `User${i}`,
			gender: faker.helpers.arrayElement(genderTypes),
			email: `user${i}@admin.hu`,
			role: i === 0 ? 'manager' : 'customer',
			phoneNumber: `+362011111${i}`,
			password: 'Pwd-123456',
			passwordAgain: 'Pwd-123456',
			birthday: new Date(`1999, 1, ${i+1}`)
		});

		await User.create(user);
	}
}