<script lang="ts">
  import { renderRichText } from '@storyblok/svelte';
  import DOMPurify from 'isomorphic-dompurify';
  export let blok: any;
  $: html = DOMPurify.sanitize(renderRichText(blok?.content) ?? '', {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target', 'rel']
  });
</script>
<div class="prose">{@html html}</div>
