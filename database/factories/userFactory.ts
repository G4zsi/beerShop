import {faker} from '@faker-js/faker';
import { User } from '../models/userModel';

export {
	createSimpleUser,
	createManagerUser,
	createAdminUser
};

async function createSimpleUser() {
	const user = await new User({
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		gender: faker.person.gender(),
		email: faker.internet.email(),
		role: 'customer',
		phoneNumber: faker.phone.number(),
		password: '123456',
		passwordAgain: '123456',
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
		gender: faker.person.gender(),
		email: faker.internet.email(),
		role: 'manager',
		phoneNumber: faker.phone.number(),
		password: '123456',
		passwordAgain: '123456',
		birthday: faker.date.birthdate(),
	});

	await User.create(user);
}

async function createAdminUser() {
	const user = await new User({
		firstName: 'admin',
		lastName: 'admin',
		gender: faker.person.gender(),
		email: 'admin@admin.hu',
		role: 'admin',
		phoneNumber: faker.phone.number(),
		password: '123456',
		passwordAgain: '123456',
		birthday: faker.date.birthdate(),
	});

	await User.create(user);
}