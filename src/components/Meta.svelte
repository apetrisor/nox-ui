<script>
	export let title = '';
	export let description = '';
	export let url = '';
	export let domain = '';
	export let pagination = null;
	export let queryString = '';
	export let pageNo = `Page ${pagination?.page}`;
	export let pageRange = `Page ${pagination?.page} of ${pagination?.pages}`;

	export let ogType = 'website';
	export let ogTitle = title;
	export let ogDescription = description;
	export let image = '';

	export let translations = []; // for rel="alternate"
	export let schema = []; // JSON-LD schema, can be an array of multiple JSONs

	// Prepare queryString
	$: qs = queryString && '&' + encodeURI(queryString);
	// Transform schema into an array if needed
	$: schemaList = schema && (Array.isArray(schema) ? schema : [schema]);
</script>

<svelte:head>
	{#if pagination?.page > 1}
		<title>{title} - {pageNo}</title>
		<meta name="description" content="{pageRange} - {description}" />
		<meta property="og:title" content="{ogTitle} - {pageNo}" />
		<meta property="og:description" content="{pageRange} - {ogDescription}" />
	{:else}
		<title>{title}</title>
		<meta name="description" content={description} />
		<meta property="og:title" content={ogTitle} />
		<meta property="og:description" content={ogDescription} />
	{/if}

	<meta property="og:type" content={ogType} />

	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	{#if url}
		{#if !pagination}
			<link rel="canonical" href="{domain}{url}" />
			<meta property="og:url" content="{domain}{url}" />
		{:else if pagination.page === 1}
			<link rel="canonical" href="{domain}{url}?p=1{qs}" />
			<meta property="og:url" content="{domain}{url}?p=1{qs}" />
		{/if}
	{/if}

	{#if pagination && pagination.prev}
		<link rel="prev" href="{domain}{url}?p={pagination.prev}{qs}" />
	{/if}
	{#if pagination && pagination.next}
		<link rel="next" href="{domain}{url}?p={pagination.next}{qs}" />
	{/if}

	{#if translations && translations.length}
		{#each translations as { url, lang } (url)}
			<link rel="alternate" href="{domain}{url}" hreflang={lang} />
		{/each}
	{/if}

	{#if schemaList}
		{#each schemaList as item}
			{@html `<script type="application/ld+json">${JSON.stringify(item)}</script>`}
		{/each}
	{/if}
</svelte:head>
