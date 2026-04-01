<script lang="ts">
  // This component expects to be rendered by Storyblok with a 'blok' prop.
  // Fields needed in Storyblok component "OverGoof":
  // - title (Text)
  // - intro (Textarea)  → short paragraph
  // - body1 (Textarea)  → paragraph
  // - body2 (Textarea)  → paragraph (optional)
  // - image (Asset)     → main photo
  export let blok: any = {};

  const title = blok?.title ?? 'over goof';
  const intro = blok?.intro ?? '';
  const body1 = blok?.body1 ?? '';
  const body2 = blok?.body2 ?? '';
  const image = blok?.image;
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
        <img src={image.filename} alt={image.alt || title} loading="lazy" />
      {/if}
    </div>
  </div>
</section>

<style>
  .about-section {
    padding: 80px 10px;
    max-width: 1400px;
    margin: 0 auto;
    font-family: 'Outfit', sans-serif;
  }

  .about-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }

  .about-content h1 {
    color: #4A5B4C;
    font-size: 3.5rem;
    margin-bottom: 30px;
    font-weight: 600;
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
    min-height: 500px;
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
      min-height: 400px;
      order: -1;
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
      min-height: 300px;
    }
  }
</style>