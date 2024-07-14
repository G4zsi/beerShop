import test, { expect } from '@playwright/test';

test('Basic User API test', async({request}) => {
	await test.step('Step 1: Get all users', async()=> {
		const resp = await request.get('http://localhost:5000/users');
		await expect(resp).toBeOK();
	}); 

    
});