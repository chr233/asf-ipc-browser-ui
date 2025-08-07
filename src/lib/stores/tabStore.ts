/*
 * @Author       : Chr_
 * @Date         : 2025-08-06 23:43:32
 * @LastEditors  : Chr_
 * @LastEditTime : 2025-08-07 13:30:16
 * @Description  :
 */
import { writable } from 'svelte/store';
import type { TabData } from '$lib/models/TabData';

export const tabs = writable<TabData[]>([]);
export const activeTabId = writable<string>('-HOME-');

export const pageTitle = writable<string>('ASF IPC BROWSER');
