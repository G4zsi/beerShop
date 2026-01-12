import test, { expect } from '@playwright/test';

test('Basic User API test', async({request}) => {
	let userID: string;
	let newUserID: string;
	await test.step('Step 1: Get all users', async()=> {
		const resp = await request.get('http://localhost:5000/users');
		await expect(resp).toBeOK();
		const body = await resp.json();
		expect(body['length']).toEqual(17);
		userID = body['data']['queries'][0]['_id'];
	});

	await test.step('Step 2: Get 1 user', async()=> {
		const resp = await request.get(`http://localhost:5000/users/${userID}`);
		await expect(resp).toBeOK();
		const body = await resp.json();
		expect(body['data']['query']['_id']).toEqual(userID);
		expect(body['data']['query']['firstName']).toEqual('admin');
		expect(body['data']['query']['lastName']).toEqual('admin');
		expect(body['data']['query']['email']).toEqual('admin@admin.hu');
		expect(body['data']['query']['role']).toEqual('admin');
	});

	await test.step('Step 3: Create a user', async()=> {
		const newUser = {
			firstName: 'New',
			lastName: 'User',
			gender: 'Male',
			email: 'new@user.hu',
			role: 'customer',
			password: '123456',
			passwordAgain: '123456',
			birthday: '2000.04.28.'
		};
		const resp = await request.post('http://localhost:5000/users/', {data: newUser});
		await expect(resp).toBeOK();
		const body = await resp.json();
		newUserID = body['data']['query']['_id'];
		expect(body['data']['query']['firstName']).toEqual(newUser['firstName']);
		expect(body['data']['query']['lastName']).toEqual(newUser['lastName']);
		expect(body['data']['query']['email']).toEqual(newUser['email']);
		expect(body['data']['query']['role']).toEqual(newUser['role']);

	});

	await test.step('Step 1: Get 1 user', async()=> {
		const resp = await request.delete(`http://localhost:5000/users/${newUserID}`);
		await expect(resp).toBeOK();
		const respVerify = await request.get(`http://localhost:5000/users/${newUserID}`);
		expect(respVerify.status()).toBe(404);
		expect((await respVerify.json())['message']).toEqual('User not found.');
	});

    
});