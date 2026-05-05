import type { PageServerLoad } from './$types';

// Over page text comes from site_texts (loaded globally in +layout.server.ts).
// This file exists only to ensure the route runs server-side.
export const load: PageServerLoad = async () => {
	return {};
};
