<script lang="ts">
	import { onMount } from 'svelte';
	import type { TabData } from '$lib/models/TabData';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import TabViewer from '$lib/components/TabViewer.svelte';
	import TabSelector from '$lib/components/TabSelector.svelte';

	import { tabs, activeTabId } from '$lib/stores/tabStore';
	import TabAbout from '$lib/components/TabAbout.svelte';

	onMount(() => {});

	function onOpenTab(id: string, title: string, startUrl: string) {
		if ($tabs.some((tab) => tab.id === id)) {
			$activeTabId = id;
			return;
		}

		const newTab = { id, title, startUrl };
		console.log(newTab);

		$tabs = [...$tabs, newTab];
		$activeTabId = id;
	}

	function onTabClick(id?: string) {
		$activeTabId = id || '-HOME-';
	}

	function onTabClose(id?: string) {
		$tabs = $tabs.filter((tab) => tab.id !== id);
		if ($activeTabId === id) {
			$activeTabId = '-HOME-';
		}
	}
</script>

<Header {onTabClick} {onTabClose} />

<div class="flex flex-col flex-1 w-full h-full bg-green-300 py-13">
	<div class="flex-1 h-0">
		{#if $activeTabId === '-HOME-'}
			<TabSelector {onOpenTab} />
		{:else if $activeTabId === '-ABOUT-'}
			<TabAbout />
		{:else}
			{#each $tabs as tab (tab.id)}
				<div class="flex flex-col flex-1 h-full bg-gray-300" class:hidden={tab.id !== $activeTabId}>
					<TabViewer startUrl={tab.startUrl} />
				</div>
			{/each}
		{/if}
	</div>
</div>

<Footer />
