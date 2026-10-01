import type { INodeProperties } from 'n8n-workflow';
import { simplifyProperty, zeroTraceOption } from '../../shared/output';

const showOnlyForGetGoogleMapsReviews = {
	operation: ['getGoogleMapsReviews'],
	resource: ['review'],
};

export const reviewGetGoogleMapsReviewsDescription: INodeProperties[] = [
	{
		displayName: 'Place ID',
		name: 'placeId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. ChIJ...',
		displayOptions: { show: showOnlyForGetGoogleMapsReviews },
		description: 'The place_id from a Google Maps search result (not the data_id)',
		routing: { send: { type: 'body', property: 'id' } },
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 10 },
		default: 10,
		displayOptions: { show: showOnlyForGetGoogleMapsReviews },
		description: 'Max number of reviews per page. Google may return fewer.',
		routing: { send: { type: 'body', property: 'limit' } },
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForGetGoogleMapsReviews },
		description: 'Whether to return all results or only up to a given limit',
		routing: { send: { paginate: '={{ $value }}' } },
	},
	{
		displayName: 'Max Pages',
		name: 'maxPages',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 5,
		displayOptions: { show: { ...showOnlyForGetGoogleMapsReviews, returnAll: [true] } },
		description: 'Stop after this many pages even if more exist. Each page costs 1 credit.',
	},
	simplifyProperty(showOnlyForGetGoogleMapsReviews),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: showOnlyForGetGoogleMapsReviews },
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				placeholder: 'e.g. us',
				description: 'Two-letter country code',
				routing: { send: { type: 'body', property: 'country' } },
			},
			{
				displayName: 'Device',
				name: 'device',
				type: 'options',
				options: [
					{ name: 'Desktop', value: 'desktop' },
					{ name: 'Mobile', value: 'mobile' },
					{ name: 'Tablet', value: 'tablet' },
				],
				default: 'desktop',
				routing: { send: { type: 'body', property: 'device' } },
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'e.g. en',
				description: 'Language code for the reviews',
				routing: { send: { type: 'body', property: 'language' } },
			},
			{
				displayName: 'Continue From',
				name: 'continueFrom',
				type: 'string',
				default: '',
				description:
					'Start from the next_page_token of a previous response (turn off Simplify to see it). Tokens expire after one hour.',
				routing: { send: { type: 'body', property: 'next_page_token' } },
			},
			zeroTraceOption,
		],
	},
];
