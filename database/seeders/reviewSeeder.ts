import { createReview } from '../factories/reviewFactory';

export {
	seedReviews
};

async function seedReviews(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createReview();
	}
}