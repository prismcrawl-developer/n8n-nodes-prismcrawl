import type { INodeProperties } from 'n8n-workflow';
import { paginateByToken, splitResults } from '../../shared/output';
import { reviewGetGoogleMapsReviewsDescription } from './getGoogleMapsReviews';

const showOnlyForReview = {
	resource: ['review'],
};

export const reviewDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForReview,
		},
		options: [
			{
				name: 'Get Google Maps Reviews',
				value: 'getGoogleMapsReviews',
				action: 'Get google maps reviews',
				description: 'Get reviews for a Google Maps place (1 credit per page)',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/google/maps/reviews',
					},
					operations: { pagination: paginateByToken },
					output: { postReceive: [splitResults] },
				},
			},
		],
		default: 'getGoogleMapsReviews',
	},
	...reviewGetGoogleMapsReviewsDescription,
];
