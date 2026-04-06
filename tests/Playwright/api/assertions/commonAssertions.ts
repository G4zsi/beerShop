import { APIResponse, expect } from '@playwright/test';

export {
	checkCreationErrors
};

async function checkCreationErrors(response: APIResponse, expectedMessage: string) {
	expect(response.status()).toBe(406);
	const body = await response.json();
	expect(body).toMatchObject({
		status: 'failed',
		message: expectedMessage
	});
}