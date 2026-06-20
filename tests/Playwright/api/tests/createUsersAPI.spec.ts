import test from '@playwright/test';
import * as dotenv from 'dotenv';
import { createUser } from '../helpers/userHelper';
import { checkUserData } from '../assertions/userAssertions';
import { faker } from '@faker-js/faker';
import { roleTypes, UserType } from '../../../../types/UserTypes';
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
		zipCode: faker.number.int({min: 1000, max: 9999}),
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

	await test.step('Step 9: Create a user with empty first name', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: '',
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

	await test.step('Step 10: Create a user with empty last name', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'User',
			lastName: '',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your Last name.');
	});

	await test.step('Step 3: Create a user with empty email', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email: '',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your e-mail address.');
	});

	await test.step('Step 4: Create a user with empty gender', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: '',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please choose your gender.');
	});

	await test.step('Step 5: Create a user with empty role', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			role: '',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. A user must have a role!');
	});

	await test.step('Step 6: Create a user with empty password', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			role: 'customer',
			password: '',
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your password.');
	});

	await test.step('Step 7: Create a user with empty password again', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: '',
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your password again.');
	});

	await test.step('Step 8: Create a user with empty birthday', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			email:  (faker.internet.email()).toLowerCase(),
			gender: 'Male',
			role: 'customer',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '',
		}});
		await checkCreationErrors(resp, 'This field is required. Please enter your birth date.');
	});
});

test('Create user with invalid email', {tag: [tags.negative, tags.regression, tags.api]}, async({request}) => {
	const emailError = 'Wrong e-mail format. Please try again.';
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
		await checkCreationErrors(resp, emailError);
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
		await checkCreationErrors(resp, emailError);
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
		await checkCreationErrors(resp, emailError);
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
		await checkCreationErrors(resp, emailError);
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
		await checkCreationErrors(resp, emailError);
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
		await checkCreationErrors(resp, 'The gender must be Male, Female or Other.');
	});
});

test('Create user with invalid role', {tag: [tags.negative, tags.regression, tags.api]}, async({request}) => {
	await test.step('Step 1: Create a user with invalid role', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'invalid',
			password: PASSWORD,
			passwordAgain: PASSWORD,
			birthday: '2000.04.28',
		}});
		const formatted = `${roleTypes.slice(0, -1).join(', ')} or ${roleTypes[roleTypes.length - 1]}`;
		await checkCreationErrors(resp, `The role must be ${formatted}.`);
	});
});

test('Create user with invalid passwords', {tag: [tags.negative, tags.regression, tags.api]}, async({request}) => {
	await test.step('Step 1: Create a user with too short password', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: 'a',
			passwordAgain: 'a',
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'A password must contain at least 8 characters and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
	});

	await test.step('Step 2: Create a user with too long password', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: 'a'.repeat(21),
			passwordAgain: 'a'.repeat(21),
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'A password must contain at least 8 characters and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
	});

	await test.step('Step 3: Create a user with password with missing uppercase letter', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: 'pwd-123456',
			passwordAgain: 'pwd-123456',
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'A password must contain at least 8 characters and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
	});

	await test.step('Step 4: Create a user with password with missing lowercase letter', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: 'PWD-123456',
			passwordAgain: 'PWD-123456',
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'A password must contain at least 8 characters and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
	});

	await test.step('Step 5: Create a user with password with missing numbers', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: 'Pwd-abcdef',
			passwordAgain: 'Pwd-abcdef',
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'A password must contain at least 8 characters and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
	});

	await test.step('Step 6: Create a user with password with missing special character', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: 'Pwd123456',
			passwordAgain: 'Pwd123456',
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'A password must contain at least 8 characters and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
	});

	await test.step('Step 7: Create a user with password with non-matching passwords', async()=> {
		const resp = await request.post('/users/', {data: {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email:  (faker.internet.email()).toLowerCase(),
			role: 'customer',
			password: PASSWORD,
			passwordAgain: 'Pwd-654321',
			birthday: '2000.04.28',
		}});
		await checkCreationErrors(resp, 'The two passwords must be equal.');
	});
});
