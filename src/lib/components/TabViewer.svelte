<script lang="ts">
	import { Button, Input } from 'flowbite-svelte';
	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		RefreshOutline,
		ArrowUpRightFromSquareOutline
	} from 'flowbite-svelte-icons';

	interface Props {
		startUrl: string;
	}
	let { startUrl }: Props = $props();

	let iframeRef: HTMLIFrameElement;
	let url: string = $state(startUrl);

	function onBack() {
		iframeRef?.contentWindow?.history.back();
	}
	function onForward() {
		iframeRef?.contentWindow?.history.forward();
	}
	function onReload() {
		iframeRef?.contentWindow?.location.reload();
	}
	function onOpen() {
		window.open(url, '_blank');
	}
	function onUrlInput(e: Event) {
		url = (e.target as HTMLInputElement).value;
		iframeRef?.setAttribute('src', url);
	}
	function onIframeLoad() {
		try {
			const currentUrl = iframeRef?.contentWindow?.location.href;
			if (currentUrl) url = currentUrl;
		} catch {
			// 跨域时无法获取
		}
	}
</script>

<div class="flex h-full w-full flex-col p-4">
	<div class="mb-4 flex items-center space-x-2">
		<Button size="xs" class="rounded" onclick={onBack}>
			<ArrowLeftOutline />
		</Button>
		<Button size="xs" class="rounded" onclick={onForward}>
			<ArrowRightOutline />
		</Button>
		<Button size="xs" class="rounded" onclick={onReload}>
			<RefreshOutline />
		</Button>
		<Input size="md" type="text" bind:value={url} onchange={onUrlInput} />
		<Button size="xs" class="rounded" onclick={onOpen}>
			<ArrowUpRightFromSquareOutline />
		</Button>
	</div>

	<iframe
		class="w-full flex-1 rounded border"
		bind:this={iframeRef}
		src={url}
		on:load={onIframeLoad}
	></iframe>
</div>
