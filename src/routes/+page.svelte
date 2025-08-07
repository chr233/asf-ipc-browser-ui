<script lang="ts">
	import MainPage from '$lib/pages/MainPage.svelte';
	import { initLocale } from '$lib/i18n/index';
	import { register, init, _ } from 'svelte-i18n';
	import { Spinner, Card } from 'flowbite-svelte';
	const setupResult = initLocale();
</script>

{#await setupResult}
	<div class="text-center">
		<Spinner />
	</div>
{:then}
	<MainPage />
{:catch error}
	<Card href="/cards" class="p-4 sm:p-6 md:p-8">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Noteworthy technology acquisitions 2021
		</h5>
		<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
			Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
			chronological order.
		</p>
	</Card>
{/await}
