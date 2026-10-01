# n8n-nodes-prismcrawl

This is an n8n community node. It lets you use [PrismCrawl](https://www.prismcrawl.com) in your n8n workflows.

PrismCrawl returns search results, places, app catalogs, products, and public reviews as structured JSON.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Usage](#usage)
[Development](#development)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- **Google**
  - Search: Google results, with country, language, location, device, search tab (including AI Mode), and time filters
- **Google Maps**
  - Search: places around a latitude and longitude
  - Get Reviews: reviews for a place, with optional automatic pagination

The node can also be used as a tool by n8n AI agents.

## Credentials

Create an API key in the PrismCrawl dashboard, then add a **PrismCrawl API** credential in n8n and paste the key. Testing the credential does not use any search credits.

## Usage

- **Credits:** every completed search costs 1 credit, including searches with no results. Validation and authentication errors are free. With **Return All** on, each page is a separate search, so **Max Pages** caps how many credits one execution can use.
- **Simplify** (on by default) outputs one n8n item per result. Turn it off to get the full API response, including `search_parameters`, `has_next_page`, `next_page_token`, and SERP features.
- **Location targeting** for Google Search: use only one of Location, Latitude/Longitude, or UULE.

## Development

```bash
npm install
npm run dev     # starts n8n at http://localhost:5678 with this node loaded
npm run build
npm run lint
```

The Country, Language, and Google Domain dropdowns are generated from the PrismCrawl OpenAPI spec. Run `npm run generate:options` to refresh them.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [PrismCrawl API documentation](https://www.prismcrawl.com/docs)
- [PrismCrawl OpenAPI spec](https://www.prismcrawl.com/openapi.json)
