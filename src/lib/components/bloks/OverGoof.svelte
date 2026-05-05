<script lang="ts">
  import { optimizeImage, srcSet } from '$lib/storyblokImage';

  interface Blok {
    title?: string;
    intro?: string;
    body1?: string;
    body2?: string;
    image?: { filename?: string; alt?: string };
  }
  export let blok: Blok = {};

  $: title = blok.title || 'over goof';
  $: intro = blok.intro || '';
  $: body1 = blok.body1 || '';
  $: body2 = blok.body2 || '';
  $: image = blok.image;

  // Image displays at ~640px tall desktop, ~420px mobile in a square-ish container
  const PORTRAIT_WIDTHS = [400, 600, 900, 1280];
  const PORTRAIT_SIZES = '(min-width: 1025px) 50vw, 100vw';
</script>

<section class="about-section">
  <div class="about-container">
    <div class="about-content">
      <h1>{title}</h1>

      {#if intro}<p>{intro}</p>{/if}
      {#if body1}<p>{body1}</p>{/if}
      {#if body2}<p>{body2}</p>{/if}
    </div>

    <div class="about-image">
      {#if image?.filename}
        <img
          src={optimizeImage(image.filename, 900)}
          srcset={srcSet(image.filename, PORTRAIT_WIDTHS)}
          sizes={PORTRAIT_SIZES}
          alt={image.alt || title}
          width="900"
          height="1333"
          loading="lazy"
          decoding="async"
        />
      {/if}
    </div>
  </div>
</section>

<style>
  .about-section {
    padding: 80px 10px;
    font-family: 'Outfit', sans-serif;
  }

  .about-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }

  .about-content h1 {
    color: #4A5B4C;
    font-size: 3.5rem;
    margin-bottom: 30px;
    font-weight: 500;
    text-transform: lowercase;
  }

  .about-content p {
    color: #4A5B4C;
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 25px;
    white-space: pre-line; /* keep line breaks from textarea */
  }

  .about-image {
    background-color: #e8d9d9;
    border-radius: 20px;
    width: 100%;
    height: 640px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .about-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    display: block;
  }

  @media (max-width: 1024px) {
    .about-container {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .about-image {
      height: 340px;
      order: -1;
    }
  }

  @media (max-width: 900px) {
    .about-section {
      padding: 60px 1.5rem;
    }

    .about-content h1 {
      font-size: 3rem;
    }

    .about-image {
      height: 320px;
      border-radius: 16px;
    }

    .about-image img {
      border-radius: 16px;
    }
  }

  @media (max-width: 768px) {
    .about-section {
      padding: 40px 1rem;
    }

    .about-content h1 {
      font-size: 2.5rem;
    }

    .about-image {
      height: 460px;
    }
  }

  @media (max-width: 600px) {
    .about-section {
      padding: 30px 1rem;
    }

    .about-content h1 {
      font-size: 2rem;
    }

    .about-content p {
      font-size: 0.95rem;
    }

    .about-image {
      height: 420px;
      border-radius: 12px;
    }

    .about-image img {
      border-radius: 12px;
    }
  }
</style>