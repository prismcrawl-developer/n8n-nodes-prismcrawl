import type { INodeProperties } from 'n8n-workflow';
import { splitResults } from '../../shared/output';
import { placeSearchGoogleMapsDescription } from './searchGoogleMaps';

const showOnlyForPlace = {
	resource: ['place'],
};

export const placeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPlace,
		},
		options: [
			{
				name: 'Search Google Maps',
				value: 'searchGoogleMaps',
				action: 'Search google maps for places',
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
		default: 'searchGoogleMaps',
	},
	...placeSearchGoogleMapsDescription,
];
