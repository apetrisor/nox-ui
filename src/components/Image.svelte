<script>
	import {onMount} from 'svelte';

	export let src;
	export let alt;
	export let className;

	let imageElement;
	let loaded = false;

	// Whenever src changes, set loaded to false
	$: src, (loaded = false);

	onMount(() => {
		if (imageElement) {
			// Image might be already loaded - happens sometimes!
			if (imageElement.complete) {
				loaded = true;
			} else {
				imageElement.onload = () => (loaded = true);
			}
		}
	});
</script>

<style lang="sass">
	img
		width: 100%
		opacity: 0
		&.loaded
			transition: opacity 0.7s ease-out
			opacity: 1
</style>

<img bind:this={imageElement} class={className} class:loaded {src} {alt} />
