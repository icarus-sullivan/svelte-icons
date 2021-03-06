<style>
  .icon {
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */

    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: wrap;
    justify-content: space-around;
  }

  .icon-holder {
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-size: 24px;
    box-shadow: 0px 2px 4px #999;
  }

  p {
    font-size: 12px;
  }

  .icons-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, 7em);
    grid-gap: 1em;
    grid-auto-rows: minmax(3em, auto);
    grid-auto-flow: dense;
    width: 100%;
  }
</style>

<script>
  export let query = '';
  export let icons = {};

  let entries = Object.entries(icons);

  $: q = new RegExp(query, 'ig');
</script>

<div class='icons-gallery'>
  {#each entries as entry}
    {#if entry[0].match(q)}
      <div class='icon'>
        <div class='icon-holder'>
          <svelte:component this={entry[1]} />
        </div>
        <p>{entry[0]}</p>
      </div>
    {/if}
  {/each}
</div>

