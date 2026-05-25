import test from '@playwright/test';
import * as dotenv from 'dotenv';
import { createUser } from '../helpers/userHelper';
import { checkUserData } from '../assertions/userAssertions';
import { faker } from '@faker-js/faker';
import { UserType } from '../../../../types/UserTypes';
import { checkCreationErrors } from '../assertions/commonAssertions';
import { tags } from '../../utils/tags';


dotenv.config();

const PASSWORD = String(process.env.USER_PWD);

test('Create User Successfully', {tag: [tags.regression, tags.api]}, async({request}) => {
	const userData1: UserType = {
		firstName: 'New',
		lastName: 'User',
		gender: 'Male',
		email:  (faker.internet.email()).toLowerCase(),
		role: 'customer',
		password: PASSWORD,
		passwordAgain: PASSWORD,
		birthday: '2000.04.28'
	};

	const userData2: UserType = {
		firstName: 'New',
		lastName: 'User',
		gender: 'Female',
		email:  (faker.internet.email()).toLowerCase(),
		role: 'manager',
		password: PASSWORD,
		passwordAgain: PASSWORD,
		birthday: '1999.12.31',
		phoneNumber: faker.phone.number(),
		zipCode: faker.location.zipCode(),
		city: faker.location.city(),
		address: faker.location.streetAddress(),
	};

	await test.step('Step 1: Create a user', async()=> {
		const user = await createUser(request, userData1);
		await checkUserData(user, userData1);
	});

	await test.step('Step 2: Create a second user with different data', async()=> {
		const user = await createUser(request, userData2);
		await checkUserData(user, userData2);
	});

});

test('Create User with Missing Required Fields', {tag: [tags.negative, tags.regression, tags.api]}, async({request}) => {
	await test.step('Step 1: Create a user with missing first name', async()=> {
		const resp = await request.post('/users/', {data: {
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your First name.');
	});

	await test.step('Step 2: Create a user with missing last name', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your Last name.');
	});

	await test.step('Step 3: Create a user with missing email', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your e-mail address.');
	});

	await test.step('Step 4: Create a user with missing gender', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please choose your gender.');
	});

	await test.step('Step 5: Create a user with missing role', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. A user must have a role!');
	});

	await test.step('Step 6: Create a user with missing password', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			role: 'customer',
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your password.');
	});

	await test.step('Step 7: Create a user with missing password again', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			role: 'customer',
			password: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your password again.');
	});

	await test.step('Step 8: Create a user with missing birthday', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your birth date.');
	});
});

test('Create user with invalid email', {tag: [tags.negative, tags.regression, tags.api]}, async({request}) => {
	await test.step('Step 1: Create a user with invalid email, no @', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  'invalidemail.com',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'Wrong e-mail format. Please try again');
	});

	await test.step('Step 2: Create a user with invalid email, no mail server', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  'invalidemail@.com',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'Wrong e-mail format. Please try again');
	});

	await test.step('Step 3: Create a user with invalid email, no user name', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  '@example.com',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'Wrong e-mail format. Please try again');
	});

	await test.step('Step 4: Create a user with invalid email, no domain', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  'invalidemail@example.',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'Wrong e-mail format. Please try again');
	});

	await test.step('Step 5: Create a user with invalid email, no dot', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  'invalidemail@examplecom',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'Wrong e-mail format. Please try again');
	});
});

test('Create user with invalid gender', {tag: [tags.negative, tags.regression, tags.api]}, async({request}) => {
	await test.step('Step 1: Create a user with invalid gender', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Invalid',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'Wrong e-mail format. Please try again');
	});
});