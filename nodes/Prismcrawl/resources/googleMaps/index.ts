import type { INodeProperties } from 'n8n-workflow';
import { paginateByToken, splitResults } from '../../shared/output';
import { googleMapsGetReviewsDescription } from './getReviews';
import { googleMapsSearchDescription } from './search';

const showOnlyForGoogleMaps = {
	resource: ['googleMaps'],
};

export const googleMapsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForGoogleMaps,
		},
		options: [
			{
				name: 'Get Reviews',
				value: 'getReviews',
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
			{
				name: 'Search',
				value: 'search',
				action: 'Search google maps',
				description: 'Find places on Google Maps around a location (1 credit per request)',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/google/maps/search',
					},
					output: { postReceive: [splitResults] },
				},
			},
		],
		default: 'search',
	},
	...googleMapsSearchDescription,
	...googleMapsGetReviewsDescription,
];
