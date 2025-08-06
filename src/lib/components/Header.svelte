<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { CloseOutline, HomeOutline } from 'flowbite-svelte-icons';

	import { activeTabId, tabs } from '$lib/stores/tabStore';

	interface Props {
		onTabClick?: (id?: string) => void;
		onTabClose?: (id: string) => void;
	}

	let { onTabClick, onTabClose }: Props = $props();

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

<div class="fixed top-0 left-0 right-0 z-50 w-full bg-gray-100 shadow">
	<div class="flex items-center justify-between p-2">
		<ButtonGroup>
			<Button pill color={$activeTabId==="-HOME-" ? 'primary' : 'light'} onclick={() => innerOnTabClick()}>
				<HomeOutline />
			</Button>
		</ButtonGroup>

		<ButtonGroup>
			{#each $tabs as tab (tab.id)}
				<Button
					pill
					color={$activeTabId == tab.id ? 'primary' : 'light'}
					onclick={() => innerOnTabClick(tab.id)}
				>
					{tab.title}
				</Button>
			{/each}
		</ButtonGroup>

		<ButtonGroup>
			<Button
				pill
				color="light"
				disabled={!$activeTabId}
				onclick={() => innerOnTabClose($activeTabId)}
			>
				<CloseOutline />
			</Button>
		</ButtonGroup>
	</div>
</div>
