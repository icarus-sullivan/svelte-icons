<style>
	ul {
		list-style-type: none;
		margin: 0;
    padding: 0;
		cursor: default;
	}

	li {
		padding: 1em;
	}

	main {
		float: left;
		padding: 1em;
		flex: 1;
	}

	aside {
		width: 300px;
		float: left;
		border-right: 1px solid #333;
	}

	.project-li {
		padding: 10px;
	}

	.selected {
		background-color: lightgray;
	}

	.content {
		display: flex;
	}
</style>

<script>
	import packages from './config';

	import IconPack from './packs/IconPack.svelte';

	import * as bs from './packs/BS.svelte';

	const icons = {
		bs,
	};

	let selected = packages[0];
	let query = '';

	$: q_lower = query.toLowerCase();
	$: icon_pack = icons[selected.id];

	const handleSelectPackage = (pack) => {
		if (pack.id !== selected.id) {
			selected = pack;
		}
	}
</script>

<!-- <main>
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
</main> -->

<div class='content'>
	<aside>
		<input type='text' bind:value={query} />
		<ul>
			{#each packages as pack}
				<li class={pack.id === selected.id ? 'selected' : ''} 
					on:click={() => handleSelectPackage(pack)}>{pack.name}</li>
			{/each}
		</ul>
	</aside>
	<main>
		<h1>{selected.name}</h1>
		<ul>
			<li class='project-li'><a href={selected.license_url} target='_blank'>{selected.license}</a></li>
			<li class='project-li'><a href={selected.url} target='_blank'>{selected.url}</a></li>
		</ul>
		<div style='font-size: 24px'>
			<svelte:component this={icon_pack} query={q_lower} />
		</div>
	</main>
</div>