<script lang="ts">
    import { Input, Button } from 'flowbite-svelte';
   import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from "flowbite-svelte";  import type BotResult from '../models/BotResult';

    export let ipcPassword: string = '';
    export let onIpcPasswordChange: (val: string) => void = () => {};
    export let botStatus: BotResult | null = null;
    export let onOpenTab: (botName: string) => void = () => {};
    export let defaultUrl: string = 'baidu.com';
    export let onDefaultUrlChange: (val: string) => void = () => {};

    // 生成表格数据
    let botList: any[] = [];
    $: botList = botStatus
        ? Object.entries(botStatus.Result).map(([id, detail]) => ({
                id,
                botName: detail.BotName,
                nickname: detail.Nickname,
                level: detail.AccountFlags,
                steamId: detail.SteamID,
                online: detail.IsConnectedAndLoggedOn
          }))
        : [];
</script>

<div class="max-w-4xl mx-auto p-4 space-y-6">
    <!-- IPC 密码输入 -->
    <div>
        <label class="block mb-1 font-medium">IPC 密码</label>
        <Input
            type="text"
            placeholder="请输入IPC密码"
            bind:value={ipcPassword}
            on:input={(e) => onIpcPasswordChange((e.target as HTMLInputElement).value)}
            class="w-full"
        />
    </div>

    <!-- Bot 列表 Table -->
    <div>
        <label class="block mb-2 font-medium">Bot 列表</label>
        <Table>
            <TableHead>
                <TableHeadCell>Id</TableHeadCell>
                <TableHeadCell>BotName</TableHeadCell>
                <TableHeadCell>Nickname</TableHeadCell>
                <TableHeadCell>Level</TableHeadCell>
                <TableHeadCell>SteamId</TableHeadCell>
                <TableHeadCell>Online</TableHeadCell>
                <TableHeadCell>操作</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each botList as bot}
                    <TableRow>
                        <TableCell>{bot.id}</TableCell>
                        <TableCell>{bot.botName}</TableCell>
                        <TableCell>{bot.nickname}</TableCell>
                        <TableCell>{bot.level}</TableCell>
                        <TableCell>{bot.steamId}</TableCell>
                        <TableCell>
                            {#if bot.online}
                                <span class="text-green-600 font-bold">在线</span>
                            {:else}
                                <span class="text-gray-400">离线</span>
                            {/if}
                        </TableCell>
                        <TableCell>
                            {#if bot.online}
                                <Button size="xs" color="blue" on:click={() => onOpenTab(bot.botName)}>
                                    打开标签
                                </Button>
                            {/if}
                        </TableCell>
                    </TableRow>
                {/each}
            </TableBody>
        </Table>
    </div>

    <!-- 默认网址输入 -->
    <div>
        <label class="block mb-1 font-medium">默认网址</label>
        <Input
            type="text"
            placeholder="baidu.com"
            bind:value={defaultUrl}
            on:input={(e) => onDefaultUrlChange((e.target as HTMLInputElement).value)}
            class="w-full"
        />
    </div>
</div>