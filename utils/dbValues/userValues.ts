export const genderTypes = ['Male', 'Female', 'Other'];
export const roleTypes = ['customer', 'admin', 'manager'];

export type GenderTypes = typeof genderTypes[number];
export type RoleTypes = typeof roleTypes[number];
