<script>
	import Link from './Link.svelte';
	import FaPinterest from 'svelte-icons/fa/FaPinterest.svelte';
	import FaFacebookF from 'svelte-icons/fa/FaFacebookF.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
	// import FaLinkedinIn from 'svelte-icons/fa/FaLinkedinIn.svelte'
	export let title;
	export let extra = '';
	export let url;
	export let image;
	export let hashtags;
	export let round = false;
	export let filled = false;

	$: facebookLink = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
	$: twitterLink = encodeURI(`https://twitter.com/intent/tweet?url=${url}&text=${title} ${extra}&hashtags=${hashtags}`);
	$: pinterestLink = encodeURI(`http://pinterest.com/pin/create/bookmarklet/?media=${image}&url=${url}&is_video=false&description=${title}`);
	// $: linkedinLink = encodeURI(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
</script>

<div class="nox-share-box">
	<slot name="title" />
	<div class="buttons" class:round class:filled>
		<Link class="facebook" external href={facebookLink}>
			<FaFacebookF />
		</Link>
		<Link class="twitter" external href={twitterLink}>
			<FaTwitter />
		</Link>
		<Link class="pinterest" external href={pinterestLink}>
			<FaPinterest />
		</Link>
		<!-- <Link class="linkedin" external href={linkedinLink}>
			<FaLinkedinIn />
		</Link> -->
		<!-- <a href="https://api.whatsapp.com/send?text=urlencodedtext" target="_blank">WA</a> -->
		<!-- <a rel="nofollow" target="_blank" href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a> -->
	</div>
</div>

<style lang="scss" global>
	.nox-share-box {
		.buttons {
			display: flex;
			justify-content: center;
		}
		a {
			width: 44px;
			height: 44px;
			padding: 10px;
			transition:
				color 0.3s,
				background-color 0.3s,
				transform 0.3s;
			&:hover {
				transform: translateY(-2px);
			}

			&.facebook {
				color: #3b5998;
			}

			&.twitter {
				color: #55acee;
			}

			&.pinterest {
				color: #e60023;
			}

			&.linkedin {
				color: #0077b5;
			}
		}

		.round a {
			border-radius: 50%;
		}

		.filled a:hover {
			color: #fff;
			&.facebook {
				background-color: #3b5998;
			}

			&.twitter {
				background-color: #55acee;
			}

			&.pinterest {
				background-color: #e60023;
			}

			&.linkedin {
				background-color: #0077b5;
			}
		}
	}
</style>
