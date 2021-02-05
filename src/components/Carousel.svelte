<script>
	import Siema from 'siema';
	import {onMount} from 'svelte';

	export let perPage = 3;
	export let controls = true;
	export let threshold = 20;
	export let rtl = false;

	let siema;
	let controller;

	onMount(() => {
		let is_mobile = 'ontouchstart' in document.documentElement ? true : false;
		let props = is_mobile
			? {
					draggable: true,
					multipleDrag: true,
					duration: 200,
					easing: 'ease-out',
			  }
			: {
					draggable: false,
					multipleDrag: false,
					duration: 700,
					easing: 'cubic-bezier(0.4, 0, 0, 1)',
			  };

		controller = new Siema({
			selector: siema,
			perPage,
			loop: true,
			threshold,
			rtl,
			...props,
		});

		return () => controller.destroy();
	});

	const goLeft = () => controller.prev(controller.perPage);
	const goRight = () => controller.next(controller.perPage);
</script>

<style lang="sass">
	.nox-carousel
		position: relative
		width: 100%
		justify-content: center
		align-items: center

	button
		position: absolute
		width: 40px
		height: 40px
		top: 50%
		z-index: 50
		margin-top: -20px
		border: none
		background-color: transparent

	button:focus
		outline: none

	.left
		left: 2vw

	.right
		right: 2vw
</style>

<div class="nox-carousel">
	<div class="slides" bind:this={siema}>
		<slot />
	</div>
	{#if controls}
		<button class="left" on:click={goLeft}>
			<slot name="prev-button" />
		</button>
		<button class="right" on:click={goRight}>
			<slot name="next-button" />
		</button>
	{/if}
</div>
