<script lang="ts">
	import { activeTabId } from '$lib/stores/tabStore';
	import { DarkMode, Footer, Button, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import { LanguageOutline } from 'flowbite-svelte-icons';
	import { _, locale } from 'svelte-i18n';
	import type { ClassValue } from 'svelte/elements';
	import { browser } from '$app/environment';

	interface Props {
		class?: ClassValue | undefined | null;
		onTabClick?: (id?: string) => void;
		onTabClose?: (id: string) => void;
	}

	let { class: customClass }: Props = $props();

	function goto(tab: string) {
		$activeTabId = tab;
	}

	function toggleLang() {
		if ($locale === 'en-us') {
			$locale = 'zh-cn';
		} else {
			$locale = 'en-us';
		}

		if (browser) {
			localStorage.setItem('locale', $locale);
		}
	}
</script>

<Footer class={customClass} footerType="socialmedia">
	<div class="flex flex-1 space-x-2">
		<DarkMode />

		<Button
			color="light"
			size="xs"
			class="text-gray-500 border-0 focus-within:ring-0 dark:border-0 dark:text-gray-400 dark:focus-within:ring-0 dark:hover:border-0"
			onclick={toggleLang}
			title={$_('changeLanguage')}
		>
			<LanguageOutline />
		</Button>
	</div>
	<FooterLinkGroup class="flex items-center text-sm text-gray-500 flex-nowarp dark:text-gray-400">
		<FooterLink href="#" onclick={() => goto('-HOME-')}>{$_('home')}</FooterLink>
		<FooterLink href="#" onclick={() => goto('-ABOUT-')}>{$_('about')}</FooterLink>
	</FooterLinkGroup>
</Footer>
