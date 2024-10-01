// sEARCH
import { liteClient as algoliasearch } from "algoliasearch/lite";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const algoliaAppKey = process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY;

const searchClient = algoliasearch(algoliaAppId, algoliaAppKey);

export default searchClient;
