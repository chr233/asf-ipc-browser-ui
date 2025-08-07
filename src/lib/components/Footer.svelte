<script lang="ts">
	import { activeTabId } from '$lib/stores/tabStore';
	import { DarkMode, Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		class?: ClassValue | undefined | null;
		onTabClick?: (id?: string) => void;
		onTabClose?: (id: string) => void;
	}

	let { class: customClass }: Props = $props();

	function goto(tab: string) {
		$activeTabId = tab;
	}
</script>

<Footer class={customClass}>
	<div class="flex flex-1">
		<DarkMode />
	</div>
	<FooterLinkGroup class="flex items-center text-sm text-gray-500 flex-nowarp dark:text-gray-400">
		<FooterLink href="#" onclick={() => goto('-HOME-')}>Home</FooterLink>
		<FooterLink href="#" onclick={() => goto('-ABOUT-')}>About</FooterLink>
	</FooterLinkGroup>
</Footer>
