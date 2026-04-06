import { APIResponse, expect } from '@playwright/test';
import { UserType } from '../../../../types/UserTypes';

export {
	checkUserData
};

async function checkUserData(response: APIResponse, userData: UserType) {
	await expect(response).toBeOK();
	const body = (await response.json())?.data?.query;
	expect(body).toMatchObject({
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		role: userData.role,
		birthday: new Date(userData.birthday).toISOString(),
		gender: userData.gender,
	});

	if(userData.phoneNumber) {
		expect(body).toHaveProperty('phoneNumber', userData.phoneNumber);
	}

	if(userData.zipCode || userData.city || userData.address || userData.billingZipCode || userData.billingCity || userData.billingAddress) {
		expect(body).toHaveProperty('zipCode', userData.zipCode);
		expect(body).toHaveProperty('city', userData.city);
		expect(body).toHaveProperty('address', userData.address);
		expect(body).toHaveProperty('billingZipCode', userData.billingZipCode);
		expect(body).toHaveProperty('billingCity', userData.billingCity);
		expect(body).toHaveProperty('billingAddress', userData.billingAddress);
		expect(body).toHaveProperty('phoneNumber', userData.phoneNumber);
	}

	if(userData.newsLetter !== undefined) {
		expect(body).toHaveProperty('newsLetter', userData.newsLetter);
	}

	// TODO check favourites, wishlist, purchaseHistory, cart, reviews
}


