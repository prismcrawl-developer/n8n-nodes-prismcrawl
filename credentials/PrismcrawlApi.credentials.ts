import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class PrismcrawlApi implements ICredentialType {
	name = 'prismcrawlApi';

	displayName = 'PrismCrawl API';

	icon: Icon = {
		light: 'file:../nodes/Prismcrawl/prismcrawl.svg',
		dark: 'file:../nodes/Prismcrawl/prismcrawl.dark.svg',
	};

	documentationUrl =
		'https://www.prismcrawl.com/docs?utm_source=n8n&utm_medium=integration&utm_content=credential';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Create or rotate your API key in the PrismCrawl dashboard. Testing this credential runs one Google search, which uses 1 credit.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	// Runs one real search (1 credit) because the public API has no free key-check endpoint.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.prismcrawl.com',
			url: '/v1/google/search',
			method: 'POST',
			body: { query: 'prismcrawl', zero_trace: true },
		},
	};
}
