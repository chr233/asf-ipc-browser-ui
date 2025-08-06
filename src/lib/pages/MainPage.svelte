<script lang="ts">
	import { onMount } from 'svelte';
	import type { TabData } from '$lib/models/TabData';
	import Header from '$lib/components/Header.svelte';
	import TabViewer from '$lib/components/TabViewer.svelte';
	import TabSelector from '$lib/components/TabSelector.svelte';

	let tabs: TabData[] = $state([{ id: 'test', title: '测试', url: 'https://www.baidu.com' }]);

	let activeTabId: string | undefined = $state(undefined);

	onMount(() => {
		console.log('onMount called');
		activeTabId = 'test';
	});

	function onOpenTab(id: string, title: string, url: string) {
		if (tabs.some((tab) => tab.id === id)) {
			activeTabId = id;
			return;
		}

		const newTab = { id, title, url };
		console.log(newTab);

		tabs.push(newTab);
		activeTabId = id;
	}

	function onTabClick(id?: string) {
		activeTabId = id || undefined;
	}

	function onTabClose(id?: string) {
		tabs = tabs.filter((tab) => tab.id !== id);
		if (activeTabId === id) {
			activeTabId = undefined;
		}
	}

	let currentId = 0;
</script>

<Header {tabs} {activeTabId} {onTabClick} {onTabClose} />

<div class="flex h-[calc(100vh-3rem)] flex-col md:flex-row">
	{#if activeTabId === undefined}
		<TabSelector {onOpenTab} />
	{:else}
		{#each tabs.filter((t) => t.id === activeTabId) as tab}
			<TabViewer startUrl="http://localhost:2500/Proxy/aaaa1111/flzhi67642/https/steamcommunity.com/443/" />
		{/each}
	{/if}
</div>
