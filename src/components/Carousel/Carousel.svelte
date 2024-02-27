<script>
	import {Splide, SplideTrack} from '@splidejs/svelte-splide';
	import ChevronLeftIcon from 'svelte-feather-icons/src/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from 'svelte-feather-icons/src/icons/ChevronRightIcon.svelte';
	import '@splidejs/svelte-splide/css/core';

	export let perPage = 3;
	export let breakpoints = {};
</script>

<Splide
	hasTrack={false}
	options={{
		pagination: false,
		type: 'loop',
		speed: 700,
		easing: 'cubic-bezier(0.4, 0, 0, 1)',
		perPage,
		breakpoints
	}}
>
	<SplideTrack>
		<slot />
	</SplideTrack>

	<div class="splide__arrows">
		<button class="splide__arrow splide__arrow--prev"><slot name="prev-button"><ChevronLeftIcon /></slot></button>
		<button class="splide__arrow splide__arrow--next"><slot name="next-button"><ChevronRightIcon /></slot></button>
	</div>
</Splide>

<style lang="scss" global>
	.splide__arrow {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		top: 50%;
		z-index: 50;
		margin-top: -20px;
		border-radius: 50%;
		border: 1px solid;
		@apply bg-slate-200;
		@apply border-slate-300;
		@apply shadow;
		transition: all 0.3s;
		&:hover {
			@apply bg-sky-300;
			@apply shadow-md;
		}
	}

	.splide__arrow--prev {
		left: 20px;
	}

	.splide__arrow--next {
		right: 20px;
	}
</style>
