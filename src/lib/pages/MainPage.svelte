<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import TabViewer from '$lib/components/TabViewer.svelte';
	import TabSelector from '$lib/components/TabSelector.svelte';
	import { _, locale } from 'svelte-i18n';

	import { tabs, activeTabId, pageTitle } from '$lib/stores/tabStore';
	import TabAbout from '$lib/components/TabAbout.svelte';
	import { onMount } from 'svelte';

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

	function updateTitle() {
		switch ($activeTabId) {
			case '-HOME-':
			case '-ABOUT-':
				$pageTitle = $_('title');
				break;
			default:
				const tab = $tabs.find((t) => t.id === $activeTabId);
				$pageTitle = tab ? `${tab.id} - ${tab.title}` : 'ASF IPC 浏览器管理';
				break;
		}
	}

	function onTabClick(id?: string) {
		$activeTabId = id || '-HOME-';
		updateTitle();
	}

	function onTabClose(id?: string) {
		$tabs = $tabs.filter((tab) => tab.id !== id);
		if ($activeTabId === id) {
			$activeTabId = '-HOME-';
		}
	}

	onMount(() => {
		$locale = localStorage.getItem('locale') || 'zh-cn';
		updateTitle();
	});
</script>

<div
	class="sticky flex flex-col w-full h-screen text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400"
>
	<Header {onTabClick} {onTabClose} class="top-0 left-0 right-0 z-50 flex-none w-full shadow-md" />

	<div class="flex-1 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">
		{#if $activeTabId === '-HOME-'}
			<TabSelector {onOpenTab} />
		{:else if $activeTabId === '-ABOUT-'}
			<TabAbout />
		{:else}
			{#each $tabs as tab (tab.id)}
				<div class="h-full" class:hidden={tab.id !== $activeTabId}>
					<TabViewer startUrl={tab.startUrl} />
				</div>
			{/each}
		{/if}
	</div>

	<Footer class="flex p-2 shadow-inner sm:p-2" />
</div>
