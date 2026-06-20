import { Request } from 'express';
import { Product } from '../../database/models/productModel';
import { checkExtraFields } from '../utils/checkExtraFields';
import { productCategories, fermentationTypes } from '../../types/ProductTypes';
import { handleValidationWarning, handleValidationError, handleSuccessfulValidation } from '../utils/loggerHelper';

export {
	validateProduct
};

async function validateProduct(product: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(product, Product);
	} catch (err) {
		return handleValidationError(String(err));
	}

	if(!options.update) {
		if(!product.name) {
			return handleValidationWarning('This field is required. Please enter the product\'s name.');
		}

		if(!product.onStock) {
			return handleValidationWarning('This field is required. Please enter how many of this product is on stock.');
		}

		if(!product.category) {
			return handleValidationWarning('Please choose a category for the product.');
		}

		if(!product.description) {
			return handleValidationWarning('Please enter description for the product.');
		}

		if(!product.price) {
			return handleValidationWarning('Please enter the correct price for the product');
		}

		if(product.discount == undefined) {
			return handleValidationWarning('If the product is not discounted, please enter "0" Else enter the percentage of the discount.');
		}

		if(!product.manufacturer) {
			return handleValidationWarning('Please enter the manufacturer of the product');
		}
	}

	if(product.name && product.name.length === 0) {
		return handleValidationWarning('This field is required. Please enter the product\'s name.');
	}

	if (product.onStock) {
		if(product.onStock.toString().length === 0) {
			return handleValidationWarning('This field is required. Please enter how many of this product is on stock.');
		} else if (typeof product.onStock != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		}
	}

	if (product.category) {
		if(product.category.length === 0) {
			return handleValidationWarning('Please choose a category for the product.');
		} else if(!productCategories.includes(product.category)) {
			const formatted = `${productCategories.slice(0, -1).join(', ')} or ${productCategories[productCategories.length - 1]}`;
			return handleValidationWarning(`The category must be ${formatted}.`);
		}
	}

	if(product.description && product.description.length === 0) {
		return handleValidationWarning('Please enter description for the product.');
	}

	if (product.price) {
		if(product.price.toString().length === 0) {
			return handleValidationWarning('Please enter the correct price for the product');
		} else if (typeof product.price != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		}
	}

	if (product.discount != undefined) {
		if(product.discount.toString().length === 0) {
			return handleValidationWarning('If the product is not discounted, please enter "0" Else enter the percentage of the discount.');
		} else if (typeof product.discount != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		}
	}

	if(product.fermentation) {
		if(!fermentationTypes.includes(product.fermentation)) {
			const formatted = `${fermentationTypes.slice(0, -1).join(', ')} or ${fermentationTypes[fermentationTypes.length - 1]}`;
			return handleValidationWarning(`The fermentation type must be ${formatted}.`);
		}
	}

	if(product.manufacturer && product.manufacturer.length === 0) {
		return handleValidationWarning('Please enter the manufacturer of the product');
	}

	return handleSuccessfulValidation('Product validated successfully.');
}
