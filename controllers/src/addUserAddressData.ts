import { Request } from 'express';

export {
	addUserAddressData
};

function addUserAddressData(user: Request['body']){
	const billingAddress = {
		billingZipCode: '',
		billingCity: '',
		billingAddress: ''
	};
	if(!user.billingZipCode) {
		billingAddress.billingZipCode = user.zipCode;
		billingAddress.billingCity = user.city;
		billingAddress.billingAddress = user.address;
		user = {...user, ...billingAddress};
	}
	return user;
}