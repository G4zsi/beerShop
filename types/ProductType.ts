export {
	ProductType
};

type ProductType = {
    name: string;
	onStock: number;
	category: ['beer', 'snack', 'glass', 'clothing', 'non-alcoholic', 'book', 'gift card', 'other'];
	description: string;
	price: number;
	manufacturer: string;
	type?: string;
	country?: string;
	fermentation?: {'ale': string, 'lager': string, 'hibrid': string},
	color?: string;
	// TODO: review type
	reviews?: string;
};