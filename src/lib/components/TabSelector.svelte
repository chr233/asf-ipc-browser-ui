<script lang="ts">
	import {
		Input,
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		DropdownHeader
	} from 'flowbite-svelte';

	import { getBotStatus } from '$lib/api';

	interface Props {
		onOpenTab: (id: string, title: string, url: string) => void;
	}

	let { onOpenTab }: Props = $props();

	import type { BotDetail } from '$lib/models/BotResult';

	import { onMount } from 'svelte';

	let ipcPassword: string = $state('13');
	let defaultUrl: string = $state('http://localhost:8688/Api/Status');

	// 生成表格数据
	let botsList: BotDetail[] = [
		{
			BotName: 'flzhi67642',
			IsConnectedAndLoggedOn: true,
			IsPlayingPossible: true,
			PublicIP: '98.142.138.99',
			s_SteamID: '76561199744061603',
			AccountFlags: 2637957,
			AvatarHash: null,
			KeepRunning: true,
			Nickname: '天若',
			SteamID: 76561199744061603,
			WalletBalance: 503,
			WalletBalanceDelayed: 0,
			WalletCurrency: 23
		},
		{
			BotName: 'fmgua75039',
			IsConnectedAndLoggedOn: true,
			IsPlayingPossible: true,
			PublicIP: '98.142.138.99',
			s_SteamID: '76561199744924434',
			AccountFlags: 2637957,
			AvatarHash: null,
			KeepRunning: true,
			Nickname: '刘培茄中校',
			SteamID: 76561199744924434,
			WalletBalance: 1936,
			WalletBalanceDelayed: 0,
			WalletCurrency: 23
		},
		{
			BotName: 'fqzqt89363',
			IsConnectedAndLoggedOn: false,
			IsPlayingPossible: true,
			PublicIP: '171.213.136.118',
			s_SteamID: '76561199744917482',
			AccountFlags: 2637957,
			AvatarHash: null,
			KeepRunning: true,
			Nickname: '林肯',
			SteamID: 76561199744917482,
			WalletBalance: 1937,
			WalletBalanceDelayed: 0,
			WalletCurrency: 23
		}
	];

	let searchTerm = $state('');

	let filteredBots = $derived.by(() =>
		botsList.filter(
			(item) => !searchTerm || item.BotName.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	async function reloadBots() {
		try {
			const response = await getBotStatus('ASF', ipcPassword);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	}

	onMount(() => {});
</script>

<div class="mx-auto w-full space-y-4 p-4">
	<label class="mb-2 block font-medium" for="ipc">IPC 密码</label>
	<Input type="text" id="ipc" placeholder="请输入IPC密码" bind:value={ipcPassword} clearable>
		<!-- {#snippet left()}
			<ApiKeyOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
		{/snippet}
		{#snippet right()}
			<Button size="sm" type="submit">Search</Button>
		{/snippet} -->
	</Input>

	<label class="mb-2 block font-medium" for="url">默认网址</label>
	<Input type="url" id="url" placeholder="要访问的网址" bind:value={defaultUrl} clearable />

	<Button class="w-full" onclick={reloadBots}>刷新机器人列表</Button>

	<label class="mb-2 block font-medium" for="password">Bot 列表</label>

	<TableSearch
		inputClass="w-full"
		placeholder="搜索BotName"
		hoverable
		bind:inputValue={searchTerm}
		striped
	>
		<TableHead>
			<TableHeadCell>BotName</TableHeadCell>
			<TableHeadCell>NickName</TableHeadCell>
			<TableHeadCell>SteamId</TableHeadCell>
			<TableHeadCell>操作</TableHeadCell>
		</TableHead>

		<TableBody>
			{#each filteredBots as bot}
				<TableBodyRow>
					<TableBodyCell>{bot.BotName}</TableBodyCell>
					<TableBodyCell>{bot.Nickname}</TableBodyCell>
					<TableBodyCell>{bot.SteamID}</TableBodyCell>
					<TableBodyCell>
						<Button
							size="xs"
							onclick={() => {
								onOpenTab(bot.BotName, 'test', defaultUrl);
							}}>浏览</Button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
