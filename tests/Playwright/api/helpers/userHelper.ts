
import { APIRequestContext, expect } from '@playwright/test';
import { UserType, genderTypes } from '../../../../types/UserTypes';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const PASSWORD = String(process.env.USER_PWD);

export {
	getAllUsers,
	getUser,
	createUser,
	createRandomUser,
	deleteUser
};

async function getAllUsers(request: APIRequestContext) {
	const resp = await request.get('/users');
	await expect(resp).toBeOK();
	return resp;
}

async function getUser(request: APIRequestContext, userID: string) {
	const resp = await request.get(`/users/${userID}`);
	await expect(resp).toBeOK();
	return resp;
}

async function createUser(request: APIRequestContext, userData: UserType) {
	const resp = await request.post('/users/', {data: userData});
	await expect(resp).toBeOK();
	return resp;
}

async function createRandomUser(request: APIRequestContext) {
	const randomUser = {
		firstName: 'Random',
		lastName: 'User',
		gender: faker.helpers.arrayElement(genderTypes),
		email: faker.internet.email(),
		role: 'customer',
		password: PASSWORD,
		passwordAgain: PASSWORD,
		birthday: faker.date.birthdate({min: 18, max: 65, mode: 'age'})
	};
	return await createUser(request, randomUser as UserType);
}

async function deleteUser(request: APIRequestContext, userID: string) {
	const resp = await request.delete(`/users/${userID}`);
	await expect(resp).toBeOK();
	return resp;
}

