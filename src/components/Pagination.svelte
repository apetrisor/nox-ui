<script>
	import ChevronLeftIcon from 'svelte-feather-icons/src/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from 'svelte-feather-icons/src/icons/ChevronRightIcon.svelte';

	export let data;
	export let path;
	export let searchParams;

	// Generate an array of page numbers
	// -1 means dots for mobile only, 0 means dots
	const getPages = (current, total) => {
		let pages = [1];
		if (current === 3 || current === 4) pages.push(-1);
		else if (current > 4) pages.push(0);
		for (var i = Math.max(current - 2, 2); i <= Math.min(current + 2, total - 1); i++) pages.push(i);
		if (current + 3 < total) pages.push(0);
		else if (current + 1 < total) pages.push(-1);
		if (i <= total) pages.push(total);
		return pages;
	};

	const getQuery = page => {
		searchParams.set('p', page);
		return searchParams.toString();
	};

	$: current = data.page;
	$: total = data.pages;
	$: pages = getPages(current, total);
</script>

{#if total > 1}
	<div class="nox-pagination">
		{#if current > 1}
			<a class="item prev" href="{path}?{getQuery(current - 1)}">
				<slot name="prev-button">
					<ChevronLeftIcon />
				</slot>
			</a>
		{/if}
		{#each pages as page}
			{#if page === -1}
				<span class="dots mobile">...</span>
			{:else if page === 0}
				<span class="dots">...</span>
			{:else if page === current}
				<span class="item current">{page}</span>
			{:else if page !== 1 && page !== total}
				<a class="item tablet" href="{path}?{getQuery(page)}">{page}</a>
			{:else}
				<a class="item" href="{path}?{getQuery(page)}">{page}</a>
			{/if}
		{/each}
		{#if current < total}
			<a class="item next" href="{path}?{getQuery(current + 1)}">
				<slot name="next-button">
					<ChevronRightIcon />
				</slot>
			</a>
		{/if}
	</div>
{/if}

<style lang="scss" global>
	@import '../assets/variables';

	.nox-pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50px;
		.item {
			width: 44px;
			height: 44px;
			padding: 10px;
			border-radius: 50%;
			margin-right: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s ease-out;
		}
		.dots {
			margin-right: 10px;
		}
		.mobile {
			@screen sm {
				display: none;
			}
		}
		.tablet {
			display: none;
			@screen sm {
				display: flex;
			}
		}
	}
</style>
