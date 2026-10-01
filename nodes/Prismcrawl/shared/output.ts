import type {
	DeclarativeRestApiSettings,
	IDataObject,
	IDisplayOptions,
	IExecutePaginationFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

type SearchContent = {
	results?: IDataObject[];
	next_page_token?: string;
};

const getContent = (json: IDataObject): SearchContent | undefined =>
	(json.data as IDataObject | undefined)?.content as SearchContent | undefined;

const toResultItems = (items: INodeExecutionData[]): INodeExecutionData[] =>
	items.flatMap((item) =>
		(getContent(item.json)?.results ?? []).map((result) => ({ json: result })),
	);

/**
 * Every PrismCrawl search responds with `{ success, request_id, data: { format, content: { results } } }`.
 * When "Simplify" is on, emit one n8n item per result instead of the whole envelope.
 */
export async function splitResults(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	// Token pagination needs the raw envelope to read next_page_token; paginateByToken splits it instead.
	if (this.getNodeParameter('returnAll', false) as boolean) return items;
	if (!(this.getNodeParameter('simplify', true) as boolean)) return items;
	return toResultItems(items);
}

/**
 * Follows `next_page_token` until results run out or "Max Pages" is reached.
 * Each page is a billable search, so the cap protects the user's credits.
 */
export async function paginateByToken(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const maxPages = this.getNodeParameter('maxPages', 5) as number;
	const simplify = this.getNodeParameter('simplify', true) as boolean;
	const body = (requestData.options.body ?? {}) as IDataObject;

	const pages: INodeExecutionData[] = [];
	let nextPageToken: string | undefined;

	for (let page = 0; page < maxPages; page++) {
		const responseItems = await this.makeRoutingRequest({
			...requestData,
			options: {
				...requestData.options,
				body: nextPageToken ? { ...body, next_page_token: nextPageToken } : body,
			},
		});
		pages.push(...responseItems);

		nextPageToken = responseItems.length
			? getContent(responseItems[0].json)?.next_page_token
			: undefined;
		if (!nextPageToken) break;
	}

	return simplify ? toResultItems(pages) : pages;
}

export const simplifyProperty = (show: NonNullable<IDisplayOptions['show']>): INodeProperties => ({
	displayName: 'Simplify',
	name: 'simplify',
	type: 'boolean',
	default: true,
	displayOptions: { show },
	description: 'Whether to return a simplified version of the response instead of the raw data',
});

export const zeroTraceOption: INodeProperties = {
	displayName: 'Zero Trace',
	name: 'zeroTrace',
	type: 'boolean',
	default: false,
	description:
		'Whether to stop PrismCrawl from storing the source or parsed response. Request history will only show billing metadata.',
	routing: { send: { type: 'body', property: 'zero_trace' } },
};
