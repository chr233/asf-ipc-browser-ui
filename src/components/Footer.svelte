<script lang="ts">
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
</script>

<Footer>
	<FooterCopyright href="/" by="Flowbite™" year={2022} />
	<FooterLinkGroup
		class="mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
	>
		<FooterLink href="/about">About</FooterLink>
		<FooterLink href="/about">About</FooterLink>
	</FooterLinkGroup>
</Footer>
