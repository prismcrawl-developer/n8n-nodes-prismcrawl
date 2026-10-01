import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { placeDescription } from './resources/place';
import { reviewDescription } from './resources/review';
import { webSearchDescription } from './resources/webSearch';

export class Prismcrawl implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PrismCrawl',
		name: 'prismcrawl',
		icon: { light: 'file:prismcrawl.svg', dark: 'file:prismcrawl.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get search results, places, and reviews as structured data from PrismCrawl',
		defaults: {
			name: 'PrismCrawl',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'prismcrawlApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.prismcrawl.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Place',
						value: 'place',
					},
					{
						name: 'Review',
						value: 'review',
					},
					{
						name: 'Web Search',
						value: 'webSearch',
					},
				],
				default: 'webSearch',
			},
			...webSearchDescription,
			...placeDescription,
			...reviewDescription,
		],
	};
}
