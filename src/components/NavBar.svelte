<script>
	import {browser} from '$app/environment';
	import SearchOverlay from './SearchOverlay.svelte';
	import SearchBar from './SearchBar.svelte';
	import {fly} from 'svelte/transition';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import MenuIcon from 'svelte-feather-icons/src/icons/MenuIcon.svelte';
	import SearchIcon from 'svelte-feather-icons/src/icons/SearchIcon.svelte';

	export let submenu;
	export let path;
	export let query;
	export let placeholder;
	export let sticky = false;
	export let autocomplete = null;

	let searchOverlayVisible = false;

	let mobileMenuOpen = false;
	// When page or query update, close menus
	$: path, query, (mobileMenuOpen = false);
	// When mobile menu changes state, toggle document scrolling
	$: if (browser) document.body.style['overflow'] = mobileMenuOpen ? 'hidden' : '';

	const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);

	let scrollY;
	$: stuck = scrollY > 60;
</script>

<svelte:window bind:scrollY />

<div class="nox-navbar" class:is-sticky={sticky} class:stuck>
	<div class="inner">
		<div class="container">
			<div class="header mobile">
				<div class="header-left">
					<button class="menu-button" on:click={toggleMobileMenu} type="button">
						{#if mobileMenuOpen}
							<XIcon />
						{:else}
							<MenuIcon />
						{/if}
					</button>
				</div>

				<slot name="logo"><a href="/">Company Logo</a></slot>

				<div class="header-right">
					<button class="menu-button" type="button" on:click={() => (searchOverlayVisible = true)}>
						<SearchIcon />
					</button>
					<slot name="right" />
				</div>
			</div>

			<div class="header">
				<div class="header-left">
					<slot name="logo"><a href="/">Company Logo</a></slot>
				</div>

				<div class="search-bar">
					<SearchBar {autocomplete} size="tiny" stretch {placeholder} value={query} on:search />
				</div>

				<div class="header-right">
					<slot name="right" />
				</div>
			</div>

			{#if submenu}
				<div class="submenu">
					{#each submenu as page}
						<a href={page.path} class:active={page.path === path}>{page.name}</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	{#if searchOverlayVisible}
		<SearchOverlay on:close={() => (searchOverlayVisible = false)} on:search {placeholder} value={query} {autocomplete} />
	{/if}

	{#if mobileMenuOpen}
		<div transition:fly={{y: -20, duration: 400}} class="mobile-menu">
			<div class="container">
				{#if submenu}
					<div class="submenu">
						{#each submenu as page}
							<a href={page.path} class:active={page.path === path}>{page.name}</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-navbar {
		transition: all 0.3s;
		position: relative;

		.inner {
			border-bottom: 1px solid $gray-200;
			background: #fff;
		}

		&.is-sticky {
			height: 64px;
			.inner {
				height: 64px;
				position: fixed;
				width: 100%;
				top: 0px;
				z-index: 1000;
				transition:
					height 0.3s,
					box-shadow 0.3s;
				.submenu {
					transition: all 0.3s;
				}
			}

			&.stuck {
				.inner {
					box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
					.submenu {
						visibility: hidden;
						opacity: 0;
					}
				}
			}

			@screen md {
				height: 104px;
				.inner {
					height: 104px;
				}
				&.stuck .inner {
					height: 64px;
				}
			}
		}

		.header {
			display: none;
			align-items: center;
			justify-content: space-between;
			padding: 13px 0;
			@screen md {
				display: flex;
			}
			[slot='logo'] img {
				height: 26px;
			}
			&.mobile {
				display: flex;
				padding: 10px 0;
				@screen md {
					display: none;
				}
				[slot='logo'] img {
					height: 24px;
				}
			}
			.menu-button {
				width: 44px;
				height: 44px;
				padding: 10px;
				margin-right: -10px;
			}
		}

		.header-left,
		.header-right {
			display: flex;
			align-items: center;
			flex: 1;
		}

		.header-right {
			justify-content: flex-end;
		}

		.submenu {
			display: none;
			padding-bottom: 15px;
			justify-content: space-between;
			margin: 0px auto;
			@screen md {
				display: flex;
			}
		}

		.mobile-menu {
			position: fixed;
			z-index: 9999;
			top: 64px;
			left: 0;
			right: 0;
			bottom: 0;
			overflow-y: scroll;
			background: #fff;
			padding: 20px 0;
			@screen md {
				display: none;
			}
			.submenu {
				display: flex;
				flex-direction: column;
				a {
					padding: 20px;
					font-size: 1.1rem;
					border-bottom: 1px solid $gray-200;
				}
			}
		}
	}
</style>
