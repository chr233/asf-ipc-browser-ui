<script lang="ts">
	export let tabs: { id: string; title: string }[];
	export let activeTabId: string;
	export let onTabClick: (id: string) => void;
	export let onTabClose: (id: string) => void;

	import { Toolbar, ToolbarButton, ToolbarGroup } from 'flowbite-svelte';
	import { HomeOutline, EnvelopeOutline, ImageOutline } from 'flowbite-svelte-icons';
</script>

<div class="w-full">
    <Toolbar>
        <!-- 左侧固定 Home 按钮 -->
        <ToolbarButton>
            <button
                class="flex items-center px-3 py-1 rounded font-bold text-lg transition-colors"
                class:bg-blue-700={activeTabId === 'home'}
                on:click={() => onTabClick('home')}
            >
                <HomeOutline class="h-6 w-6 mr-1" />
            </button>
        </ToolbarButton>

        <!-- 右侧动态标签页 -->
        <ToolbarGroup class="ml-4 flex-1">
            {#each tabs.filter(tab => tab.id !== 'home') as tab (tab.id)}
                <ToolbarButton>
                    <div class="flex items-center">
                        <button
                            class="px-3 py-1 rounded transition-colors"
                            class:bg-blue-700={activeTabId === tab.id}
                            on:click={() => onTabClick(tab.id)}
                        >
                            {tab.title}
                        </button>
                        <button
                            class="ml-2 text-sm hover:text-red-400"
                            on:click={() => onTabClose(tab.id)}
                            title="关闭"
                        >
                            ✕
                        </button>
                    </div>
                </ToolbarButton>
            {/each}
        </ToolbarGroup>
    </Toolbar>
</div>

<style>
</style>
