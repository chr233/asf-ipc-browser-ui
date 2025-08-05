<script lang="ts">
    export let id: string;
    export let url: string;
    export let iframeRef: HTMLIFrameElement | null;
    export let onBack: (id: string) => void;
    export let onForward: (id: string) => void;
    export let onReload: (id: string) => void;
    export let onOpen: (id: string) => void;
    export let onUrlInput: (id: string, e: Event) => void;
    export let onIframeLoad: (id: string) => void;
</script>

<div class="flex flex-col w-full h-full p-4">
    <div class="flex items-center mb-2 space-x-2">
        <button class="px-2 py-1 bg-gray-200 rounded" on:click={() => onBack(id)}>←</button>
        <button class="px-2 py-1 bg-gray-200 rounded" on:click={() => onForward(id)}>→</button>
        <button class="px-2 py-1 bg-gray-200 rounded" on:click={() => onReload(id)}>⟳</button>
        <button class="px-2 py-1 bg-gray-200 rounded" on:click={() => onOpen(id)}>新窗口打开</button>
        <input
            class="flex-1 px-2 py-1 border rounded ml-2"
            type="text"
            value={url}
            on:change={(e) => onUrlInput(id, e)}
        />
    </div>
    <iframe
        class="flex-1 w-full border rounded"
        bind:this={iframeRef}
		src={url}
        on:load={() => onIframeLoad(id)}
    ></iframe>
</div>