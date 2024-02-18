<script>
	import Carousel from './Carousel.svelte';

	export let items = [];
	export let cardComponent;

	let loaded = false;

	const fillItems = () => {
		while (items.length < 12) {
			items = items.concat(items);
		}
		if (items.length > 12) items = items.slice(0, 12);
	};

	$: items, fillItems(), (loaded = false), setTimeout(() => (loaded = true), 1000);
</script>

{#if items.length}
	<div class="nox-card-slider" class:loaded>
		<Carousel perPage={{1280: 4, 768: 3, 480: 2}}>
			{#each items as item}
				<div class="card-wrapper">
					<svelte:component this={cardComponent} data={item} />
				</div>
			{/each}
		</Carousel>
	</div>
{/if}

<style lang="scss" global>
	.nox-card-slider {
		margin: 0 -5px;
		&.loaded {
			:global(img) {
				opacity: 1;
			}
		}
		// Media query for when there is at least 100px of space around the container
		@media (min-width: 868px) and (max-width: 1023px), (min-width: 1124px) and (max-width: 1279px), (min-width: 1380px) {
			:global(.left) {
				left: -50px;
			}
			:global(.right) {
				right: -50px;
			}
		}
	}
	.card-wrapper {
		padding: 0 5px;
	}
</style>
