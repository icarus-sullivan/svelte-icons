<script>
	import Virtual from './Virtual.svelte';

	let map = [];
	Promise.all([
		import('svelte-iconz/bs'),
		import('svelte-iconz/bx'),
		import('svelte-iconz/cg'),
		import('svelte-iconz/fi'),
		import('svelte-iconz/im'),
		import('svelte-iconz/io'),
		import('svelte-iconz/md'),
		import('svelte-iconz/si'),
		import('svelte-iconz/vsc')
	]).then((icon_packs) => {
		map = icon_packs.reduce((icons, pack) => {
			const keys = Object.keys(pack);

			for (const key of keys) {
				icons.push({
					q: key.toLowerCase(),
					name: key,
					component: pack[key]
				});
			}

			return icons;
		}, []);
	});

	let query = '';
	let cache = {};

	const filter = (q) => {
		if (!q) return map;
		if (cache[q]) return cache[q];

		cache[q] = map.filter((it) => it.q.includes(q_lower));
		return cache[q];
	}

	$: q_lower = query.toLowerCase();
	$: visible_icons = filter(q_lower);
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	header {
		position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: white;
    border-bottom: 1px #ddd solid;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.icon-well {
		display: flex;
		flex-wrap: wrap;
	}

	:global(.icon-wrapper) {
		font-size: 1em;
    color: black;
    margin: 1em;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
		width: 10vw;
    height: 10vw;
		font-size: 2em;
	}

	.icon-label {
		font-size: 14px;
		color: grey;
	}
</style>

<main>
	<header class='header'>
		<input bind:value={query} />
	</header>
	<div class='icon-well'>
		{#each visible_icons as icon} 
			<Virtual class='icon-wrapper'>
				<svelte:component this={icon.component} style={`font-size: 2em;`}/>
				<p class='icon-label'>{icon.name}</p>
			</Virtual>
		{/each}
	</div>
</main>