import {
	NodeConnectionTypes,
	type ICredentialsDecrypted,
	type ICredentialTestFunctions,
	type INodeCredentialTestResult,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { googleDescription } from './resources/google';
import { googleMapsDescription } from './resources/googleMaps';

// The API has no free "who am I" endpoint, so the credential test looks up a request ID that
// can't exist. A valid key gets 404, a bad key gets 401, and no search credit is spent.
const CREDENTIAL_TEST_URL =
	'https://api.prismcrawl.com/v1/google/search/00000000-0000-0000-0000-000000000000';

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
		credentials: [{ name: 'prismcrawlApi', required: true, testedBy: 'prismcrawlApiTest' }],
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
						name: 'Google',
						value: 'google',
					},
					{
						// "Google Maps" is a product name, not a plural
						// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
						name: 'Google Maps',
						value: 'googleMaps',
					},
				],
				default: 'google',
			},
			...googleDescription,
			...googleMapsDescription,
		],
	};

	methods = {
		credentialTest: {
			async prismcrawlApiTest(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				// Credential tests only get the legacy request helper
				// eslint-disable-next-line @n8n/community-nodes/no-deprecated-workflow-functions
				const response = await this.helpers.request({
					method: 'GET',
					uri: CREDENTIAL_TEST_URL,
					headers: { 'x-api-key': credential.data?.apiKey },
					json: true,
					simple: false,
					resolveWithFullResponse: true,
				});

				if (response.statusCode === 401 || response.statusCode === 403) {
					return {
						status: 'Error',
						message: response.body?.error?.message ?? 'Invalid API key',
					};
				}
				if (response.statusCode >= 500) {
					return { status: 'Error', message: `PrismCrawl returned HTTP ${response.statusCode}` };
				}
				return { status: 'OK', message: 'Connection successful' };
			},
		},
	};
}
