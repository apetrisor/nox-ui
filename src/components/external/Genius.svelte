<script>
	import {onMount} from 'svelte';
	export let id;
	export let page;

	let loaded = false;

	onMount(() => {
		if (document.readyState !== 'loading') {
			loaded = true;
		} else {
			document.addEventListener('DOMContentLoaded', function () {
				loaded = true;
			});
		}
	});

	$: if (loaded) {
		page;
		if (window.Genius) window.Genius.amazon.convertLinks(id, false, 'http://buy.geni.us');
	}
</script>

<svelte:head>
	<script type="text/javascript" src="//geniuslinkcdn.com/snippet.min.js" defer></script>
</svelte:head>
