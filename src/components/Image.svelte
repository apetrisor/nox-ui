<script>
	import {onMount} from 'svelte';
	import {browser} from '$app/environment';

	export let src;
	export let alt;
	export let fit = '';
	export let fade = true;

	let imageElement;
	let supportsObjectFit = browser && 'objectFit' in document.documentElement.style !== false;

	let doFade = fade && (!!fit ? supportsObjectFit : true);
	let loaded = doFade ? false : true;

	// Whenever src changes, if doFade = true, set loaded to false,
	// this will make the image fade even if it was cached
	$: src, (loaded = doFade ? false : true);

	onMount(() => {
		if (imageElement) {
			imageElement.onload = () => (loaded = true);
			if (imageElement.complete) loaded = true;
		}
	});
</script>

<div class="nox-image" class:cover={fit === 'cover'} class:contain={fit === 'contain'} class:loaded>
	{#if fit && !supportsObjectFit}
		<div style="background-image:url('{src}')" />
	{:else}
		<img bind:this={imageElement} {src} {alt} on:contextmenu {...$$restProps} />
	{/if}
</div>

<style lang="scss" global>
	.nox-image {
		opacity: 0;

		&.loaded {
			opacity: 1;
			transition: opacity 0.7s ease-out;
		}

		img {
			max-width: 100%;
		}

		&.cover,
		&.contain {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
			div {
				width: 100%;
				height: 100%;
				background-position: center;
				background-repeat: no-repeat;
			}
		}

		&.cover {
			img {
				object-fit: cover;
			}
			div {
				background-size: cover;
			}
		}

		&.contain {
			img {
				object-fit: contain;
			}
			div {
				background-size: contain;
			}
		}
	}
</style>
