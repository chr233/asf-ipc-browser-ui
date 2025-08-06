<script lang="ts">
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
	import { activeTabId, tabs } from '$lib/stores/tabStore';


	function goto(tab:string){
		$activeTabId = tab;
	}

</script>

<Footer class="fixed bottom-0 left-0 right-0">
	<FooterCopyright href="/" by="Flowbite™" year={2022} />
	<FooterLinkGroup
		class="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
	>
		<FooterLink href="#" onclick={()=>goto("-HOME-")}>Home</FooterLink>
		<FooterLink href="#" onclick={()=>goto("-ABOUT-")}>About</FooterLink>
	</FooterLinkGroup>
</Footer>
