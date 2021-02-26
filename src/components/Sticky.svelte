<script>
	import {onMount} from 'svelte';

	export let top = 0;

	let element;
	// Where how much do we scroll before it sticks
	let offsetTop = 0;
	let scrollY;
	$: stuck = scrollY >= offsetTop;

	const calculateOffsetTop = () => {
		// If widget is not already stuck
		if (element && !stuck) {
			offsetTop = element.offsetTop - top;
		}
	};
	onMount(() => {
		window.addEventListener('resize', calculateOffsetTop);
		return () => window.removeEventListener('resize', calculateOffsetTop);
	});
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-sticky {
		display: flex;
		flex-direction: column;
		&.stuck {
			@screen lg {
				position: sticky;
			}
		}
	}
</style>

<svelte:window bind:scrollY />

<div bind:this={element} class="nox-sticky" class:stuck style="top: {top}px">
	<slot />
</div>
