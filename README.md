# n8n-nodes-prismcrawl

This is an n8n community node. It lets you use [PrismCrawl](https://www.prismcrawl.com) in your n8n workflows.

PrismCrawl returns search results, places, app catalogs, products, and public reviews as structured JSON.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Usage](#usage)
[Example workflows](#example-workflows)
[Development](#development)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation-and-management/) in the n8n community nodes documentation.

## Operations

- **Web Search**
  - Search Google: Google results, with country, language, location, device, search tab (including AI Mode), and time filters
- **Place**
  - Search Google Maps: places around a latitude and longitude
- **Review**
  - Get Google Maps Reviews: reviews for a place, with optional automatic pagination

The node can also be used as a tool by n8n AI agents.

## Credentials

1. Sign up at [prismcrawl.com](https://www.prismcrawl.com) and create an API key in the PrismCrawl dashboard.
2. In n8n, add a **PrismCrawl API** credential and paste the key.

Testing the credential in n8n runs one Google search, which uses 1 credit.

## Usage

- **Credits:** every completed search costs 1 credit, including searches with no results. Validation and authentication errors are free. With **Return All** on, each page is a separate search, so **Max Pages** caps how many credits one execution can use.
- **Simplify** (on by default) outputs one n8n item per result. Turn it off to get the full API response, including `search_parameters`, `has_next_page`, `next_page_token`, and SERP features.
- **Location targeting** for Search Google: use only one of Location, Latitude/Longitude, or UULE.
- **Place IDs:** Get Google Maps Reviews needs a `place_id`, which you can take from the results of Search Google Maps.

## Example workflows

**Track where your site ranks on Google**

1. **Schedule Trigger**: run daily.
2. **PrismCrawl** (Web Search → Search Google): Query `best espresso machines`, Country `United States`.
3. **Filter**: keep results whose `url` contains your domain.
4. **Google Sheets**: append the date, query, and `rank`.

**Build a list of local businesses**

1. **Manual Trigger**.
2. **PrismCrawl** (Place → Search Google Maps): Query `coffee shops`, Latitude `30.2672`, Longitude `-97.7431`.
3. **Google Sheets** or a CRM node: save each place's `title`, `address`, `phone`, `website`, and `rating`.

**Get alerts for new negative reviews**

1. **Schedule Trigger**: run daily.
2. **PrismCrawl** (Review → Get Google Maps Reviews): Place ID from a Search Google Maps result, Page Size `10`.
3. **Filter**: keep reviews with a `rating` of 2 or lower.
4. **Slack** or **Send Email**: post the review `text` and `author`.

## Development

```bash
npm install
npm run dev     # starts n8n at http://localhost:5678 with this node loaded
npm run build
npm run lint
```

The Country and Language dropdowns are generated from the PrismCrawl OpenAPI spec. Run `npm run generate:options` to refresh them.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [PrismCrawl API documentation](https://www.prismcrawl.com/docs)
- [PrismCrawl OpenAPI spec](https://www.prismcrawl.com/openapi.json)
