<script lang="ts">
	import type BotResult from '../models/BotResult';
	export let botStatus: BotResult | null;
	export let loading: boolean;
	export let error: string;
	export let selectedBot: string | null;
	export let onSelect: (name: string) => void;

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { Input, Label, Helper, Button, Checkbox, A } from 'flowbite-svelte';
</script>

<div>
	<div class="grid gap-6">
		<div>
			<Label for="first_name" class="mb-2">IPC 密码</Label>
			<Input type="text" id="first_name" placeholder="John" clearable />
		</div>
		<Button color="dark">Dark</Button>
	</div>

	<h2 class="font-semibold">Bot 列表</h2>

	{#if loading}
		<p>加载中...</p>
	{:else if error}
		<p class="text-red-500">{error}</p>
	{:else if botStatus}
		<ul>
			<Table striped={true}>
				<TableHead>
					<TableHeadCell>Product name</TableHeadCell>
					<TableHeadCell>Color</TableHeadCell>
					<TableHeadCell>Category</TableHeadCell>
					<TableHeadCell>Price</TableHeadCell>
					<TableHeadCell>
						<span class="sr-only">Edit</span>
					</TableHeadCell>
				</TableHead>
				<TableBody>
					<TableBodyRow>
						<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
						<TableBodyCell>Sliver</TableBodyCell>
						<TableBodyCell>Laptop</TableBodyCell>
						<TableBodyCell>$2999</TableBodyCell>
						<TableBodyCell>
							<a
								href="/tables"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
							>
						</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
						<TableBodyCell>White</TableBodyCell>
						<TableBodyCell>Laptop PC</TableBodyCell>
						<TableBodyCell>$1999</TableBodyCell>
						<TableBodyCell>
							<a
								href="/tables"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
							>
						</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>Magic Mouse 2</TableBodyCell>
						<TableBodyCell>Black</TableBodyCell>
						<TableBodyCell>Accessories</TableBodyCell>
						<TableBodyCell>$99</TableBodyCell>
						<TableBodyCell>
							<a
								href="/tables"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
							>
						</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>Google Pixel Phone</TableBodyCell>
						<TableBodyCell>Gray</TableBodyCell>
						<TableBodyCell>Phone</TableBodyCell>
						<TableBodyCell>$799</TableBodyCell>
						<TableBodyCell>
							<a
								href="/tables"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
							>
						</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>Apple Watch 5</TableBodyCell>
						<TableBodyCell>Red</TableBodyCell>
						<TableBodyCell>Wearables</TableBodyCell>
						<TableBodyCell>$999</TableBodyCell>
						<TableBodyCell>
							<a
								href="/tables"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
							>
						</TableBodyCell>
					</TableBodyRow>
				</TableBody>
			</Table>
		</ul>
	{/if}
</div>
