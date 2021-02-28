<script>
	import {onMount} from 'svelte';
	export let page;
	export let id;

	let loaded = false;

	function gtag() {
		window.dataLayer.push(arguments);
	}

	onMount(() => {
		window.dataLayer = window.dataLayer || [];
		gtag('js', new Date());
		gtag('config', id, {send_page_view: false});
		loaded = true;
	});

	$: if (loaded) {
		page;
		gtag('config', id);
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
</svelte:head>
