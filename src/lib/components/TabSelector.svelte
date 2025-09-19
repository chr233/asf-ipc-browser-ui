<script lang="ts">
	import { browser } from '$app/environment';
	import { getBotStatus, getStartPage, startBots, stopBots } from '$lib/api';
	import type { BotDetail } from '$lib/models/IpcGetBotsResponse';
	import { _ } from 'svelte-i18n';

	import {
		Alert,
		Button,
		ButtonGroup,
		Input,
		Skeleton,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Toggle
	} from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	interface Props {
		onOpenTab: (id: string, title: string, startUrl: string) => void;
	}

	let { onOpenTab }: Props = $props();

	let ipcPassword: string = $state('');
	let defaultUrl: string = $state('');

	let ipcMessage: string = $state('');
	let ipcLoading: boolean = $state(true);

	let botListFilter = $state('');
	let botsList: BotDetail[] = $state([]);
	let openInNewWindow: boolean = $state(false);

	let filteredBots = $derived.by(() => {
		if (!botListFilter) {
			return botsList;
		}

		const key = botListFilter.toLowerCase();
		return botsList.filter(
			(item) =>
				!botListFilter ||
				(item.BotName && item.BotName.toLowerCase().includes(key)) ||
				(item.Nickname && item.Nickname.toLowerCase().includes(key)) ||
				(item.s_SteamID && item.s_SteamID.toLowerCase().includes(key))
		);
	});

	async function reloadBots() {
		try {
			ipcLoading = true;

			botsList.length = 0;
			ipcMessage = '';

			const response = await getBotStatus('ASF', ipcPassword);

			if (!response.Success) {
				console.log(response.Message);

				ipcMessage = response.Message;

				return;
			}

			botsList.length = 0;

			for (const botName in response.Result) {
				const detail = response.Result[botName];
				botsList.push(detail);
			}

			console.log(response);
		} catch (err) {
			console.error(err);
		} finally {
			ipcLoading = false;
		}
	}

	async function startOrStopBot(botName: string, start: boolean = true) {
		try {
			ipcLoading = true;

			const response = start
				? await startBots(botName, ipcPassword)
				: await stopBots(botName, ipcPassword);

			if (!response.Success) {
				console.error(response.Message);
				ipcMessage = response.Message;
				return;
			}

			reloadBots();
		} catch (err) {
			console.error(err);
		} finally {
			ipcLoading = false;
		}
	}

	async function openViewerTab(botName: string, nickName: string) {
		try {
			ipcLoading = true;

			const { origin } = location;

			const response = await getStartPage(botName, defaultUrl, ipcPassword, origin);

			if (!response.Success || !response.Result) {
				console.error(response.Message);
				ipcMessage = response.Message;
				return;
			}

			const startUrl = response.Result;

			if (!openInNewWindow) {
				onOpenTab(botName, nickName, startUrl);
			} else {
				window.open(startUrl, '_blank');
			}
		} catch (err) {
			console.error(err);
		} finally {
			ipcLoading = false;
		}
	}

	onMount(() => {
		if (browser) {
			openInNewWindow = localStorage.getItem('openInNewWindow') === '1';
			ipcPassword = localStorage.getItem('ipcPassword') || '';
			defaultUrl = localStorage.getItem('startUrl') || 'https://store.steampowered.com/';
		}
		reloadBots();
	});

	function saveSettings() {
		if (browser) {
			localStorage.setItem('openInNewWindow', openInNewWindow ? '1' : '0');
			localStorage.setItem('ipcPassword', ipcPassword);
			localStorage.setItem('startUrl', defaultUrl);
		}
	}
</script>

<div class="mx-auto h-full w-full space-y-4 p-4">
	<label class="mb-2 block font-medium" for="ipc">{$_('selectorPage.ipcPassword')}</label>
	<Input
		type="text"
		id="ipc"
		placeholder={$_('selectorPage.ipcPasswordPlaceholder')}
		bind:value={ipcPassword}
		clearable
		oninput={saveSettings}
	/>

	<label class="mb-2 block font-medium" for="url">{$_('selectorPage.startPage')}</label>
	<Input
		type="url"
		id="url"
		placeholder={$_('selectorPage.startPagePlaceholder')}
		bind:value={defaultUrl}
		clearable
		oninput={saveSettings}
	/>

	<div class="flex w-full space-x-2">
		<Button onclick={reloadBots} loading={ipcLoading}>{$_('selectorPage.reloadBotsList')}</Button>
		<span class="flex-1"></span>
		<Toggle size="small" bind:checked={openInNewWindow} onchange={saveSettings}
			>{$_('selectorPage.openInNewWindow')}</Toggle
		>
	</div>

	<label class="mb-2 block font-medium" for="password">{$_('selectorPage.botsList')}</label>

	<TableSearch
		classes={{ input: 'w-full' }}
		placeholder={$_('selectorPage.botListFilterPlaceholder')}
		bind:inputValue={botListFilter}
		striped
	>
		<TableHead>
			<TableHeadCell>{$_('selectorPage.botName')}</TableHeadCell>
			<TableHeadCell>{$_('selectorPage.nickName')}</TableHeadCell>
			<TableHeadCell>{$_('selectorPage.steamId')}</TableHeadCell>
			<TableHeadCell>{$_('selectorPage.operator')}</TableHeadCell>
		</TableHead>

		<TableBody>
			{#if filteredBots.length === 0}
				<TableBodyRow>
					<TableBodyCell colspan={4}>
						{#if ipcLoading}
							<Skeleton size="md" class="my-8" />
						{:else if botsList.length === 0}
							<Alert color="red">
								{#snippet icon()}<InfoCircleSolid />{/snippet}

								<div class="space-x-1">
									<span>{$_('selectorPage.ipcRequestFailed')}</span>
									{#if ipcMessage}
										<span>【{ipcMessage}】</span>
									{/if}
								</div>
							</Alert>
						{:else}
							<Alert color="orange">
								{#snippet icon()}<InfoCircleSolid />{/snippet}

								<div class="space-x-1">
									<span>{$_('selectorPage.noBotsFound')}</span>
								</div>
							</Alert>
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{:else}
				{#each filteredBots as bot}
					<TableBodyRow>
						<TableBodyCell>{bot.BotName}</TableBodyCell>

						{#if bot.IsConnectedAndLoggedOn}
							<TableBodyCell>{bot.Nickname}</TableBodyCell>
							<TableBodyCell>{bot.s_SteamID}</TableBodyCell>
						{:else}
							<TableBodyCell>-</TableBodyCell>
							<TableBodyCell>{$_('selectorPage.offline')}</TableBodyCell>
						{/if}

						<TableBodyCell>
							<ButtonGroup>
								<Button
									size="xs"
									onclick={() => {
										openViewerTab(bot.BotName, bot.Nickname);
									}}
								>
									{$_('selectorPage.view')}
								</Button>

								{#if bot.IsConnectedAndLoggedOn}
									<Button
										size="xs"
										onclick={() => {
											startOrStopBot(bot.BotName, false);
										}}
									>
										{$_('selectorPage.stop')}
									</Button>
								{:else}
									<Button
										size="xs"
										onclick={() => {
											startOrStopBot(bot.BotName, true);
										}}
									>
										{$_('selectorPage.start')}
									</Button>
								{/if}
							</ButtonGroup>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
	</TableSearch>
</div>
