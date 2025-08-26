<script lang="ts">
	import MainPage from '$lib/pages/MainPage.svelte';
	import { initLocale } from '$lib/i18n/index';
	import { register, init, _ } from 'svelte-i18n';
	import { Spinner, Card, Button } from 'flowbite-svelte';
	import { LinkOutline } from 'flowbite-svelte-icons';
	const setupResult = initLocale();

	const repoLink = 'https://github.com/chr233/ASF-ipc-browser-ui';
</script>

{#await setupResult}
	<div class="text-center">
		<Spinner />
	</div>
{:then}
	<MainPage />
{:catch error}
	<div class="flex items-center justify-center min-h-screen">
		<Card class="p-6">
			<h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				初始化出错, 请更新程序
			</h3>
			<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
				{error}
			</p>
			<Button class="w-fit" href={repoLink}>前往仓库页</Button>
		</Card>
	</div>
{/await}
