import type { INodeProperties } from 'n8n-workflow';
import { splitResults } from '../../shared/output';
import { webSearchSearchGoogleDescription } from './searchGoogle';

const showOnlyForWebSearch = {
	resource: ['webSearch'],
};

export const webSearchDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWebSearch,
		},
		options: [
			{
				name: 'Search Google',
				value: 'searchGoogle',
				action: 'Search google',
				description: 'Get Google search results (1 credit per request)',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/google/search',
					},
					output: { postReceive: [splitResults] },
				},
			},
		],
		default: 'searchGoogle',
	},
	...webSearchSearchGoogleDescription,
];
