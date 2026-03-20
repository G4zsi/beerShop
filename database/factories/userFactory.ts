import {faker} from '@faker-js/faker';
import { User } from '../models/userModel';
import { GenderTypes, genderTypes } from '../../utils/dbValues/userValues';

export {
	createSimpleUser,
	createManagerUser,
	createAdminUser,
	createTestUsers
};

async function createSimpleUser(firstName?: string, lastName?: string, gender?: GenderTypes, email?: string, phoneNumber?: string, birthday?: Date) {
	const user = await new User({
		firstName: firstName ? firstName : faker.person.firstName(),
		lastName: lastName ? lastName : faker.person.lastName(),
		gender: gender ? gender : faker.helpers.arrayElement(genderTypes),
		email: email ? email : faker.internet.email(),
		role: 'customer',
		phoneNumber: phoneNumber ? phoneNumber : faker.phone.number(),
		password: 'Pwd-123456',
		passwordAgain: 'Pwd-123456',
		birthday: birthday ? birthday : faker.date.birthdate(),
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

async function createManagerUser(gender?: GenderTypes, phoneNumber?: string, birthday?: Date) {
	const user = await new User({
		firstName: 'manager',
		lastName: 'manager',
		gender: gender ? gender : faker.helpers.arrayElement(genderTypes),
		email: faker.internet.email(),
		role: 'manager',
		phoneNumber: phoneNumber ? phoneNumber : faker.phone.number(),
		password: 'Pwd-123456',
		passwordAgain: 'Pwd-123456',
		birthday: birthday ? birthday : faker.date.birthdate(),
	});

	await User.create(user);
}

async function createAdminUser(gender?: GenderTypes, phoneNumber?: string, birthday?: Date) {
	const user = await new User({
		firstName: 'admin',
		lastName: 'admin',
		gender: gender ? gender : faker.helpers.arrayElement(genderTypes),
		email: 'admin@admin.hu',
		role: 'admin',
		phoneNumber: phoneNumber ? phoneNumber : faker.phone.number(),
		password: 'Pwd-123456',
		passwordAgain: 'Pwd-123456',
		birthday: birthday ? birthday : faker.date.birthdate()
	});

	await User.create(user);
}

async function createTestUsers() {
	await createAdminUser('Male', '+3620121212', new Date(1980, 3, 3));
	await createManagerUser('Female', '+3620111111', new Date(1990, 5, 5));

	for(let i = 0; i < 20; i++) {
		await createSimpleUser(`User${i}`, `User${i}`, faker.helpers.arrayElement(genderTypes), `user${i}@user.hu`, `+362011111${i}`, new Date(1999, 1, i+1));
	}
}