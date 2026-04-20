import { useStoryblokApi } from '$lib/storyblok';

export async function load({ url }) {
	const isDraft =
		url.searchParams.has('_storyblok') || url.searchParams.get('version') === 'draft';
	const version = isDraft ? 'draft' : 'published';

	const storyblokApi = useStoryblokApi();

	try {
		const { data } = await storyblokApi.get('cdn/stories', {
			starts_with: 'werk/',
			version,
			per_page: 6,
			sort_by: 'position:asc'
		});

		return {
			projects: data.stories || []
		};
	} catch (error) {
		console.error('Error loading homepage projects:', error);
		return {
			projects: []
		};
	}
}
