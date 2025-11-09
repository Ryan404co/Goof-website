import { useStoryblokApi } from '$lib/storyblok';

export async function load() {
  const storyblokApi = useStoryblokApi();

  try {
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'werk/',
      version: 'published',
      per_page: 100,
      sort_by: 'position:asc'
    });

    return {
      projects: data.stories || []
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      projects: []
    };
  }
}
