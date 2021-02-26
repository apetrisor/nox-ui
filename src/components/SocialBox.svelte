<script>
	import Link from './Link.svelte';
	import FaFacebookSquare from 'svelte-icons/fa/FaFacebookSquare.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
	import FaPinterest from 'svelte-icons/fa/FaPinterest.svelte';
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte';

	export let links;
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-social-box {
		.buttons {
			display: flex;
			justify-content: center;
		}
		a {
			display: inline-block;
			width: 36px;
			height: 36px;
			margin-right: 20px;
			&:last-child {
				margin-right: 0;
			}
			&.facebook:hover {
				color: #4267b2;
			}
			&.twitter:hover {
				color: #1da1f2;
			}
			&.instagram:hover {
				color: #fcaf45;
			}
			&.pinterest:hover {
				color: #e60023;
			}
		}
	}
</style>

<div class="nox-social-box">
	{#if links.facebook}
		<Link external class="facebook" href={links.facebook}><FaFacebookSquare /></Link>
	{/if}
	{#if links.twitter}
		<Link external class="twitter" href={links.twitter}><FaTwitter /></Link>
	{/if}
	{#if links.pinterest}
		<Link external class="pinterest" href={links.pinterest}><FaPinterest /></Link>
	{/if}
	{#if links.instagram}
		<Link external class="instagram" href={links.instagram}><FaInstagram /></Link>
	{/if}
</div>
