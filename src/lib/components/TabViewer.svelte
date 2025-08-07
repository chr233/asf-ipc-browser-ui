<script lang="ts">
	import { Button, ButtonGroup, Input } from 'flowbite-svelte';
	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		RefreshOutline,
		GlobeOutline,
		ArrowUpRightFromSquareOutline
	} from 'flowbite-svelte-icons';
	import { _ } from 'svelte-i18n';

	interface Props {
		startUrl: string;
	}
	let { startUrl }: Props = $props();

	let iframeRef: HTMLIFrameElement;

	let url: string = $state(startUrl);

	function goBack() {
		try {
			iframeRef?.contentWindow?.history.back();
		} catch (error) {
			console.error(error);
		}
	}
	function goForward() {
		try {
			iframeRef?.contentWindow?.history.forward();
		} catch (error) {
			console.error(error);
		}
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
		}
	}
</script>

<div class="flex flex-col flex-1 w-full h-full p-3">
	<div class="flex items-center mb-2 space-x-2">
		<ButtonGroup>
			<Button size="xs"  title={$_('viewerPage.goBack')} pill onclick={goBack}>
				<ArrowLeftOutline />
			</Button>
			<Button size="xs"  class="hidden sm:flex" title={$_('viewerPage.goForward')} pill onclick={goForward}>
				<ArrowRightOutline />
			</Button>
			<Button size="xs" title={$_('viewerPage.reload')} pill onclick={reloadPage}>
				<RefreshOutline />
			</Button>
		</ButtonGroup>
		<Input
			size="md"
			placeholder={$_('viewerPage.locationPlaceholder')}
			type="text"
			bind:value={url}
		/>
		<ButtonGroup>
			<Button size="xs" title={$_('viewerPage.visit')} pill onclick={gotoUrl}>
				<GlobeOutline />
			</Button>
			<Button size="xs" title={$_('viewerPage.openInNewWindow')} pill onclick={openNewTab}>
				<ArrowUpRightFromSquareOutline />
			</Button>
		</ButtonGroup>
	</div>

	<div class="flex-1 h-0 border border-gray-300 rounded dark:border-gray-600">
		<iframe title="" class="w-full h-full" bind:this={iframeRef} src={url} onload={onIframeLoad}>
		</iframe>
	</div>
</div>
