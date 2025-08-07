<script lang="ts">
	import { Button, ButtonGroup, Input } from 'flowbite-svelte';
	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		RefreshOutline,
		GlobeOutline,
		ArrowUpRightFromSquareOutline
	} from 'flowbite-svelte-icons';

	interface Props {
		startUrl: string;
	}
	let { startUrl }: Props = $props();

	let iframeRef: HTMLIFrameElement;

	let url: string = $state(startUrl);

	function goBack() {
		iframeRef?.contentWindow?.history.back();
	}
	function goForward() {
		iframeRef?.contentWindow?.history.forward();
	}
	function reloadPage() {
		try {
			iframeRef?.contentWindow?.location.reload();
		} catch (error) {
			console.error(error);
			iframeRef.src = url;
		}
	}
	function openNewTab() {
		window.open(url, '_blank');
	}
	function gotoUrl() {
		try {
			iframeRef?.setAttribute('src', url);
		} catch (error) {
			console.error(error);
			iframeRef.src = url;
		}
	}
	function onIframeLoad() {
		try {
			const currentUrl = iframeRef?.contentWindow?.location.href;
			if (currentUrl) url = currentUrl;
		} catch (error) {
			console.error(error);
			console.error('无法获取 iframe 信息');
		}
	}
</script>

<div class="flex flex-col flex-1 w-full h-full p-3">
	<div class="flex items-center mb-2 space-x-2">
		<ButtonGroup>
			<Button size="xs" title="后退" pill onclick={goBack}>
				<ArrowLeftOutline />
			</Button>
			<Button size="xs" title="前进" pill onclick={goForward}>
				<ArrowRightOutline />
			</Button>
			<Button size="xs" title="刷新" pill onclick={reloadPage}>
				<RefreshOutline />
			</Button>
		</ButtonGroup>
		<Input size="md" placeholder="要浏览的网址" type="text" bind:value={url} />
		<ButtonGroup>
			<Button size="xs" title="访问" pill onclick={gotoUrl}>
				<GlobeOutline />
			</Button>
			<Button size="xs" title="在浏览器标签页打开" pill onclick={openNewTab}>
				<ArrowUpRightFromSquareOutline />
			</Button>
		</ButtonGroup>
	</div>

	<div class="flex-1 h-0 border border-gray-300 rounded">
		<iframe title="" class="w-full h-full" bind:this={iframeRef} src={url} onload={onIframeLoad}>
		</iframe>
	</div>
</div>
