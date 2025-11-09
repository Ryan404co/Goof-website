import { useStoryblokApi } from '$lib/storyblok';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const storyblokApi = useStoryblokApi();

  try {
    // Fetch the current project
    const { data } = await storyblokApi.get(`cdn/stories/werk/${params.slug}`, {
      version: 'published',
      resolve_links: 'url'
    });

    // Fetch other projects for "meer werk" section
    const { data: projectsData } = await storyblokApi.get('cdn/stories', {
      starts_with: 'werk/',
      version: 'published',
      per_page: 100,
      excluding_slugs: params.slug,
      sort_by: 'position:asc'
    });

    return {
      story: data.story,
      moreProjects: projectsData.stories
    };
  } catch (err) {
    console.error('Error loading project:', err);
    throw error(404, 'Project not found');
  }
}
