<script>
	export let title = '';
	export let description = '';
	export let url = '';
	export let pagination = false;
	export let image = false;
	export let queryString = '';

	$: if (pagination && pagination.page > 1) {
		title += ` - Page ${pagination.page}`;
		description = `Page ${pagination.page} of ${pagination.pages} - ${description}`;
	}
	$: if (queryString) queryString = '&' + encodeURI(queryString);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	{#if url}
		{#if !pagination}
			<link rel="canonical" href={url} />
			<meta property="og:url" content={url} />
		{:else if pagination.page === 1}
			<link rel="canonical" href="{url}?p=1{queryString}" />
			<meta property="og:url" content="{url}?p=1{queryString}" />
		{/if}
	{/if}

	{#if pagination && pagination.prev}
		<link rel="prev" href="{url}?p={pagination.prev}{queryString}" />
	{/if}
	{#if pagination && pagination.next}
		<link rel="next" href="{url}?p={pagination.next}{queryString}" />
	{/if}
</svelte:head>
