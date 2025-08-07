<script lang="ts">
	import { Button, ButtonGroup, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline, CloseOutline, HomeOutline } from 'flowbite-svelte-icons';

	import { activeTabId, tabs } from '$lib/stores/tabStore';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		class?: ClassValue | undefined | null;
		onTabClick?: (id?: string) => void;
		onTabClose?: (id: string) => void;
	}

	let { class: customClass, onTabClick, onTabClose }: Props = $props();

	let dropDownIsOpen = $state(false);

	function innerOnTabClick(id?: string) {
		dropDownIsOpen = false;

		if (onTabClick) {
			onTabClick(id);
		}
	}

	function innerOnTabClose(id?: string) {
		if (!id) {
			return;
		}

		dropDownIsOpen = false;

		if (onTabClose) {
			onTabClose(id);
		}
	}
</script>

<div class={customClass}>
	<div class="flex items-center justify-between p-2">
		<ButtonGroup>
			<Button
				pill
				title="主页"
				color={$activeTabId === '-HOME-' ? 'primary' : 'light'}
				onclick={() => innerOnTabClick()}
			>
				<HomeOutline />
			</Button>
		</ButtonGroup>

		{#if $tabs.length > 0}
			<ButtonGroup class="hidden sm:flex">
				{#each $tabs as tab (tab.id)}
					<Button
						pill
						title={tab.title}
						color={$activeTabId == tab.id ? 'primary' : 'light'}
						onclick={() => innerOnTabClick(tab.id)}
					>
						{tab.id}
					</Button>
				{/each}
			</ButtonGroup>

			<Button pill color="light" size="sm" class="flex sm:hidden">
				选择窗口
				<ChevronDownOutline />
			</Button>

			<Dropdown simple bind:isOpen={dropDownIsOpen}>
				{#each $tabs as tab (tab.id)}
					<DropdownItem
						color={$activeTabId == tab.id ? 'primary' : 'light'}
						onclick={() => innerOnTabClick(tab.id)}
					>
						{tab.id} - {tab.title}
					</DropdownItem>
				{/each}
			</Dropdown>
		{/if}

		<ButtonGroup>
			<Button
				pill
				title="关闭当前窗口"
				color="light"
				disabled={$activeTabId.startsWith('-') && $activeTabId.endsWith('-')}
				onclick={() => innerOnTabClose($activeTabId)}
			>
				<CloseOutline />
			</Button>
		</ButtonGroup>
	</div>
</div>
