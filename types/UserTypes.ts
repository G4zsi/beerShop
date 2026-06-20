import { Types } from 'mongoose';

export {
	UserType,
	GenderTypes,
	RoleTypes,
	genderTypes,
	roleTypes
};

type UserType = {
	firstName: string;
	lastName: string;
	gender: GenderTypes;
	email: string;
	role: RoleTypes;
	password: string;
	passwordAgain: string;
	birthday: Date | string;
	phoneNumber?: string;
	zipCode?: number;
	city?: string;
	address?: string;
	billingZipCode?: number;
	billingCity?: string;
	billingAddress?: string;
	newsLetter?: boolean;
	favourites?: Types.ObjectId[];
	wishlist?: Types.ObjectId[];
	purchaseHistory?: Types.ObjectId[];
	cart?: Types.ObjectId[];
	reviews?: Types.ObjectId[];
}


const genderTypes = ['Male', 'Female', 'Other'];
const roleTypes = ['customer', 'admin', 'manager'];

type GenderTypes = typeof genderTypes[number];
type RoleTypes = typeof roleTypes[number];
