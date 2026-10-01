import type { INodeProperties } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../../shared/locales';
import { simplifyProperty, zeroTraceOption } from '../../shared/output';

const showOnlyForGoogleMapsSearch = {
	operation: ['search'],
	resource: ['googleMaps'],
};

export const googleMapsSearchDescription: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. coffee shops',
		displayOptions: { show: showOnlyForGoogleMapsSearch },
		description: 'A place, business, product, or category to search for',
		routing: { send: { type: 'body', property: 'query' } },
	},
	{
		displayName: 'Latitude',
		name: 'latitude',
		type: 'number',
		required: true,
		typeOptions: { minValue: -90, maxValue: 90, numberPrecision: 6 },
		default: 0,
		displayOptions: { show: showOnlyForGoogleMapsSearch },
		description: 'Latitude of the map center',
		routing: { send: { type: 'body', property: 'coordinates.latitude' } },
	},
	{
		displayName: 'Longitude',
		name: 'longitude',
		type: 'number',
		required: true,
		typeOptions: { minValue: -180, maxValue: 180, numberPrecision: 6 },
		default: 0,
		displayOptions: { show: showOnlyForGoogleMapsSearch },
		description: 'Longitude of the map center',
		routing: { send: { type: 'body', property: 'coordinates.longitude' } },
	},
	simplifyProperty(showOnlyForGoogleMapsSearch),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: showOnlyForGoogleMapsSearch },
		options: [
			{
				displayName: 'Country',
				name: 'gl',
				type: 'options',
				options: countryOptions,
				default: 'us',
				routing: { send: { type: 'body', property: 'gl' } },
			},
			{
				displayName: 'Language',
				name: 'hl',
				type: 'options',
				options: languageOptions,
				default: 'en-US',
				routing: { send: { type: 'body', property: 'hl' } },
			},
			{
				displayName: 'Start Offset',
				name: 'start',
				type: 'number',
				typeOptions: { minValue: 0, numberStepSize: 20 },
				default: 0,
				description: 'Zero-based result offset in multiples of 20, e.g. 20 for the second page',
				routing: { send: { type: 'body', property: 'start' } },
			},
			{
				displayName: 'Zoom',
				name: 'zoom',
				type: 'number',
				typeOptions: { minValue: 3, maxValue: 21, numberPrecision: 1 },
				default: 13.1,
				description: 'Map zoom level. Lower values cover a wider area.',
				routing: { send: { type: 'body', property: 'zoom' } },
			},
			zeroTraceOption,
		],
	},
];
