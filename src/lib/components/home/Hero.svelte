<script lang="ts">
  import { page } from '$app/stores';
  import { textList, textString } from '$lib/cms/texts';

  const STEP = '4.2vw';
  $: lines = textList($page.data.texts, 'home.hero.headline_lines', [
    'streven om',
    'de wereld iets',
    'echts te geven'
  ]);
  $: paragraphs = [
    textString($page.data.texts, 'home.hero.paragraph_1', ''),
    textString($page.data.texts, 'home.hero.paragraph_2', '')
  ].filter(Boolean);
</script>

<section class="hero">
  <div class="hero__grid">
    <div class="hero__copy">
      {#each paragraphs as paragraph}
        <p class="lead">{paragraph}</p>
      {/each}
    </div>
    <div class="hero__headline" aria-label={lines.join(' ')}>
      {#each lines as line, i}
        <span class="step" style={`--i:${i}; --step:${STEP};`}>
          {line}
        </span>
      {/each}
    </div>

  </div>
</section>

<style>
  .hero {
    width: 100%;
    min-height: 40vh;
    overflow-x: hidden;
    background: #FDFF96;
    font-family: 'Outfit', sans-serif;
    padding-inline: 10px;
  }

  .hero__grid {
    display: grid;
    gap: clamp(1.2rem, 2.5vw, 2rem);
    grid-template-columns: 1fr 1.8fr;
    align-items: end;
    max-width: 1400px;
    margin: 0 auto;
    padding-top: clamp(6vh, 12vh, 12vh);
    padding-bottom: clamp(3rem, 6vh, 6rem);
  }

  /* Left column copy */
  .hero__copy {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .lead {
    max-width: 56ch;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #4A5B4C;
    margin: 0;
  }

  /* Right column headline with stepped highlight blocks (right-aligned staircase) */
  .hero__headline {
    justify-self: end;
    font-weight: 500;
    color: #4A5B4C;
    font-size: clamp(2rem, 10vw, 80px);
    line-height: 0.85;
    width: min(100%, 1100px);
    text-align: right;
  }

  .step {
    display: inline-block;
    position: relative;
    margin-left: calc(var(--i) * var(--step));
    padding: 0.12em 0.1em;
  }

  :root { --step: 4.2vw; }
  @media (max-width: 1024px) {
    :root { --step: 7vw; }
    .hero__grid{
      grid-template-columns: 1fr;
      padding-top: 4vh;
    }
    .hero__headline{
      justify-self: start;
      text-align: left;
    }
    .hero__copy {
      order: 2;
    }
  }

  @media (max-width: 900px) {
    .hero {
      padding-inline: 1.5rem;
    }
    .hero__headline {
      font-size: clamp(2rem, 8vw, 60px);
    }
  }

  @media (max-width: 768px) {
    .hero__grid {
      gap: 1.5rem;
    }
    .step {
      margin-left: 0;
    }
  }

  @media (max-width: 600px) {
    .hero {
      padding-inline: 1.25rem;
    }
    .hero__headline {
      font-size: clamp(2rem, 9vw, 48px);
    }
    .lead {
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding-inline: 1rem;
    }
  }

</style>