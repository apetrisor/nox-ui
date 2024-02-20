<script>
	export let title = '';
	export let description = '';
	export let url = '';
	export let domain = '';
	export let pagination = null;
	export let queryString = '';

	export let ogType = 'website';
	export let ogTitle = title;
	export let ogDescription = description;
	export let image = '';

	export let translations;

	$: if (pagination && pagination.page > 1) {
		title += ` - Page ${pagination.page}`;
		description = `Page ${pagination.page} of ${pagination.pages} - ${description}`;
		ogTitle += ` - Page ${pagination.page}`;
		ogDescription = `Page ${pagination.page} of ${pagination.pages} - ${ogDescription}`;
	}
	$: if (queryString) queryString = '&' + encodeURI(queryString);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:type" content={ogType} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />

	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	{#if url}
		{#if !pagination}
			<link rel="canonical" href="{domain}{url}" />
			<meta property="og:url" content="{domain}{url}" />
		{:else if pagination.page === 1}
			<link rel="canonical" href="{domain}{url}?p=1{queryString}" />
			<meta property="og:url" content="{domain}{url}?p=1{queryString}" />
		{/if}
	{/if}

	{#if pagination && pagination.prev}
		<link rel="prev" href="{domain}{url}?p={pagination.prev}{queryString}" />
	{/if}
	{#if pagination && pagination.next}
		<link rel="next" href="{domain}{url}?p={pagination.next}{queryString}" />
	{/if}

	{#if translations && translations.length}
		{#each translations as {url, lang} (url)}
			<link rel="alternate" href="{domain}{url}" hreflang={lang} />
		{/each}
	{/if}
</svelte:head>
