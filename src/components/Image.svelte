<script>
	import {onMount} from 'svelte';

	export let src;
	export let alt;
	export let className = '';

	let imageElement;
	let loaded = false;

	// Whenever src changes, set loaded to false,
	// this will make the image fade even if it was cached
	$: src, (loaded = false);

	onMount(() => {
		if (imageElement) {
			imageElement.onload = () => (loaded = true);
			if (imageElement.complete) loaded = true;
		}
	});
</script>

<style lang="sass">
	img
		opacity: 0
		&.loaded
			transition: opacity 0.7s ease-out
			opacity: 1
</style>

<img bind:this={imageElement} class={className} class:loaded {src} {alt} />
