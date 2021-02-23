<script>
	import {onMount} from 'svelte';

	export let src;
	export let alt;
	export let className = '';
	export let fit;

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

<style lang="scss">
	img {
		opacity: 0;
		&.loaded {
			transition: opacity 0.7s ease-out;
			opacity: 1;
		}
		&.cover,
		&.contain {
			width: 100%;
			height: 100%;
		}
		&.cover {
			object-fit: cover;
		}
		&.contain {
			object-fit: contain;
		}
	}
</style>

<img bind:this={imageElement} class={className + '' + fit} class:loaded {src} {alt} />
