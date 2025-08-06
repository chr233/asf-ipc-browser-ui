<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { PACKAGE_INFO } from '$lib/packageInfo';
	const { name, version, author, description } = PACKAGE_INFO;
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card class="p-4 sm:p-6 md:p-8">
		<h1 class="mb-4 text-2xl font-bold">关于本项目</h1>
		<ul class="space-y-2">
			<li><strong>项目名称：</strong> {name}</li>
			<li><strong>版本号：</strong> {version}</li>
			<li><strong>作者：</strong> {author}</li>
			<li><strong>简介：</strong> {description}</li>
		</ul>
	</Card>
</div>
