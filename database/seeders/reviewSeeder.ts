import { createReview, createTestReviews } from '../factories/reviewFactory';

export {
	seedReviews,
	seedTestReviews
};

async function seedReviews(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createReview();
	}
}

async function seedTestReviews() {
	console.log('Seeding test reviews...');
	await createTestReviews();
}