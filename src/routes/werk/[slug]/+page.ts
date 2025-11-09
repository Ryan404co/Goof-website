import { useStoryblokApi } from '$lib/storyblok';
import { error } from '@sveltejs/kit';
import type { ISbStoryData } from '@storyblok/svelte';

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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

    // Shuffle the projects array to show random projects
    const shuffledProjects = shuffleArray(projectsData.stories);

    return {
      story: data.story,
      moreProjects: shuffledProjects as ISbStoryData[]
    };
  } catch (err) {
    console.error('Error loading project:', err);
    throw error(404, 'Project not found');
  }
}
