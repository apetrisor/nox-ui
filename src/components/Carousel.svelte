<script>
	import Siema from 'siema';
	import {onMount} from 'svelte';
	import ChevronLeftIcon from 'svelte-feather-icons/src/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from 'svelte-feather-icons/src/icons/ChevronRightIcon.svelte';

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
					easing: 'ease-out'
			  }
			: {
					draggable: false,
					multipleDrag: false,
					duration: 700,
					easing: 'cubic-bezier(0.4, 0, 0, 1)'
			  };

		controller = new Siema({
			selector: siema,
			perPage,
			loop: true,
			threshold,
			rtl,
			...props
		});

		return () => controller.destroy();
	});

	const goLeft = () => controller.prev(controller.perPage);
	const goRight = () => controller.next(controller.perPage);
</script>

<div class="nox-carousel">
	<div class="slides" bind:this={siema}>
		<slot />
	</div>
	{#if controls}
		<button class="left" on:click={goLeft}>
			<slot name="prev-button"><ChevronLeftIcon /></slot>
		</button>
		<button class="right" on:click={goRight}>
			<slot name="next-button"><ChevronRightIcon /></slot>
		</button>
	{/if}
</div>

<style lang="scss" global>
	.nox-carousel {
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;

		button {
			position: absolute;
			width: 40px;
			height: 40px;
			top: 50%;
			z-index: 50;
			margin-top: -20px;
			border: none;
			background: rgba(255, 255, 255, 0.5);
			border-radius: 50%;
			padding: 5px;
			box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
			transition: all 0.3s;
			&:hover {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
			}
		}

		button:focus {
			outline: none;
		}

		.left {
			left: 20px;
		}

		.right {
			right: 20px;
		}
	}
</style>
