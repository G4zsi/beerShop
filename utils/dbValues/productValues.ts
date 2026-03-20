export const fermentationTypes = ['ale', 'lager', 'hybrid'];
export const productCategories = ['beer', 'snack', 'glass', 'clothing', 'non-alcoholic', 'book', 'gift card', 'other'];

export type FermentationTypes = typeof fermentationTypes[number];
export type ProductCategories = typeof productCategories[number];