<script lang="ts">
	import { onMount } from 'svelte';
	import { getBotStatus } from '../lib/api';
	import type BotResult from '../models/BotResult';
	import TabBar from '../components/Header.svelte';
	import BotList from '../components/BotList.svelte';
	import ViewerTab from '../components/ViewerTab.svelte';
	import BotSelectorTab from '../components/BotSelectorTab.svelte';

	type Tab = { id: string; title: string; url: string };

	let tabs: Tab[] = [{ id: 'home', title: 'HOME', url: '' }];
	let activeTabId: string = 'home';

	let botStatus: BotResult | null = null;
	let loading = false;
	let error = '';
	let selectedBot: string | null = null;

	let iframeRefs: Record<string, HTMLIFrameElement | null> = {};
	let iframeUrls: Record<string, string> = {};

	async function loadBots() {
		loading = true;
		error = '';
		try {
			const result = await getBotStatus();
			botStatus = result;
		} catch (e) {
			error = '请求失败';
			botStatus = null;
		}
		loading = false;
	}
	onMount(loadBots);

	function selectBot(name: string) {
		selectedBot = name;
	}
	function openTabForBot(name: string) {
		const url = 'https://store.steampowered.com/';
		const id = `bot-${name}`;
		if (!tabs.find((t) => t.id === id)) {
			tabs = [...tabs, { id, title: name, url }];
			iframeUrls[id] = url;
		}
		activeTabId = id;
	}
	function closeTab(id: string) {
		const idx = tabs.findIndex((t) => t.id === id);
		if (idx > 0) {
			tabs.splice(idx, 1);
			tabs = [...tabs];
			if (activeTabId === id) {
				activeTabId = tabs[Math.max(idx - 1, 0)].id;
			}
		}
	}
	function goBack(id: string) {
		iframeRefs[id]?.contentWindow?.history.back();
	}
	function goForward(id: string) {
		iframeRefs[id]?.contentWindow?.history.forward();
	}
	function reload(id: string) {
		iframeRefs[id]?.contentWindow?.location.reload();
	}
	function openInBrowser(id: string) {
		window.open(iframeUrls[id], '_blank');
	}
	function onUrlInput(id: string, e: Event) {
		const value = (e.target as HTMLInputElement).value;
		iframeUrls[id] = value;
		iframeRefs[id]?.setAttribute('src', value);
	}
	function onIframeLoad(id: string) {
		try {
			const url = iframeRefs[id]?.contentWindow?.location.href;
			if (url) iframeUrls[id] = url;
		} catch {}
	}
</script>

<TabBar {tabs} {activeTabId} onTabClick={(id) => (activeTabId = id)} onTabClose={closeTab} />

<div class="flex h-[calc(100vh-3rem)] flex-col md:flex-row">
	{#if activeTabId === 'home'}
		<div class="flex flex-1">
			<div class="w-full overflow-y-auto bg-gray-100 p-4">
				<BotList {botStatus} {loading} {error} {selectedBot} onSelect={selectBot} />

				<button
					class="rounded bg-blue-600 px-6 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
					disabled={!selectedBot}
					on:click={() => selectedBot && openTabForBot(selectedBot)}
				>
					为选中Bot创建Tab页
				</button>
			</div>
		</div>
	{:else}
		{#each tabs.filter((t) => t.id === activeTabId) as tab}
			<ViewerTab
				id={tab.id}
				url={iframeUrls[tab.id]}
				iframeRef={iframeRefs[tab.id]}
				onBack={goBack}
				onForward={goForward}
				onReload={reload}
				onOpen={openInBrowser}
				{onUrlInput}
				{onIframeLoad}
			/>
		{/each}
	{/if}
</div>
