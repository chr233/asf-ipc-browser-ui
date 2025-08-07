<script lang="ts">
	import { getBotStatus, startBots, stopBots, getStartPage } from '$lib/api';
	import type { BotDetail } from '$lib/models/IpcGetBotsResponse';
	import {
		Alert,
		Button,
		ButtonGroup,
		Input,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		Toggle,
		TableHeadCell,
		Skeleton,
		TableSearch
	} from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	interface Props {
		onOpenTab: (id: string, title: string, startUrl: string) => void;
	}

	let { onOpenTab }: Props = $props();

	let ipcPassword: string = $state('test114514');
	let defaultUrl: string = $state('https://store.steampowered.com/cart/');

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

			var response = await getStartPage(botName, defaultUrl, ipcPassword);

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
		reloadBots();
	});
</script>

<div class="w-full p-4 mx-auto space-y-4">
	<label class="block mb-2 font-medium" for="ipc">IPC 密码</label>
	<Input type="text" id="ipc" placeholder="请输入IPC密码" bind:value={ipcPassword} clearable />

	<label class="block mb-2 font-medium" for="url">起始页</label>
	<Input type="url" id="url" placeholder="要访问的网址" bind:value={defaultUrl} clearable />

	<div class="flex w-full space-x-2">
		<Button onclick={reloadBots}>刷新机器人列表</Button>
		<span class="flex-1"></span>
		<Toggle size="small" bind:checked={openInNewWindow}>在新窗口中打开</Toggle>
	</div>

	<label class="block mb-2 font-medium" for="password">Bot 列表</label>

	<TableSearch
		classes={{ input: 'w-full' }}
		placeholder="搜索 BotName NickName 或者 SteamId"
		hoverable
		bind:inputValue={botListFilter}
		striped
	>
		<TableHead>
			<TableHeadCell>BotName</TableHeadCell>
			<TableHeadCell>NickName</TableHeadCell>
			<TableHeadCell>SteamId</TableHeadCell>
			<TableHeadCell></TableHeadCell>
		</TableHead>

		<TableBody>
			{#if filteredBots.length === 0}
				<TableBodyRow>
					<TableBodyCell colspan={3}>
						{#if ipcLoading}
							<Skeleton size="md" class="my-8" />
						{:else}
							<Alert color="red">
								{#snippet icon()}<InfoCircleSolid />{/snippet}

								<div class="space-x-1">
									<span>读取机器人信息失败, 请检查 IPC 密码是否正确</span>
									{#if ipcMessage}
										<span>【{ipcMessage}】</span>
									{/if}
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
							<TableBodyCell>离线</TableBodyCell>
						{/if}

						<TableBodyCell>
							<ButtonGroup>
								<Button
									size="xs"
									onclick={() => {
										openViewerTab(bot.BotName, bot.Nickname);
									}}
								>
									浏览
								</Button>

								{#if bot.IsConnectedAndLoggedOn}
									<Button
										size="xs"
										onclick={() => {
											startOrStopBot(bot.BotName, false);
										}}
									>
										下线
									</Button>
								{:else}
									<Button
										size="xs"
										onclick={() => {
											startOrStopBot(bot.BotName, true);
										}}
									>
										上线
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
