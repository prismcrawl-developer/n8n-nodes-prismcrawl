import type { INodeProperties } from 'n8n-workflow';
import { splitResults } from '../../shared/output';
import { googleSearchDescription } from './search';

const showOnlyForGoogle = {
	resource: ['google'],
};

export const googleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForGoogle,
		},
		options: [
			{
				name: 'Search',
				value: 'search',
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
		default: 'search',
	},
	...googleSearchDescription,
];
