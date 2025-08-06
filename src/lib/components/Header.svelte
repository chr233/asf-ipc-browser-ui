<script lang="ts">
	import type { TabData } from '$lib/models/TabData';
	import { Toolbar, ToolbarButton } from 'flowbite-svelte';
	import { HomeOutline, CloseOutline } from 'flowbite-svelte-icons';

	interface Props {
		tabs: TabData[];
		activeTabId: string | undefined;
		onTabClick?: (id?: string) => void;
		onTabClose?: (id: string) => void;
	}

	let { tabs, activeTabId, onTabClick, onTabClose }: Props = $props();

	function innerOnTabClick(id?: string) {
		if (onTabClick) {
			onTabClick(id);
		}
	}

	function innerOnTabClose(id?: string) {
		if (!id) {
			return;
		}

		if (onTabClose) {
			onTabClose(id);
		}
	}
</script>

<div class="w-full">
	<Toolbar color="red">
		<!-- 左侧固定 Home 按钮 -->
		<ToolbarButton color="red" class="px-2" onclick={() => innerOnTabClick()}>
			<HomeOutline class="h-6 w-6" />
		</ToolbarButton>

		<!-- 右侧动态标签页 -->
		{#each tabs as tab (tab.id)}
			<ToolbarButton
				class="px-3"
				color={activeTabId == tab.id ? 'blue' : 'red'}
				onclick={() => innerOnTabClick(tab.id)}
			>
				{tab.title}
			</ToolbarButton>
		{/each}

		{#snippet end()}
			<!-- 右侧关闭按钮 -->
			<ToolbarButton
				class="px-2"
				color={!activeTabId ? 'dark' : 'red'}
				onclick={() => innerOnTabClose(activeTabId)}
			>
				<CloseOutline class="h-6 w-6" />
			</ToolbarButton>
		{/snippet}
	</Toolbar>
</div>
