/*
 * @Author       : Chr_
 * @Date         : 2025-08-01 16:56:44
 * @LastEditors  : Chr_
 * @LastEditTime : 2025-08-01 17:36:36
 * @Description  :
 */

import type BotResult from '../models/BotResult';

export async function getBotStatus(
	botNames: string = 'ASF',
	ipcPassword?: string
): Promise<BotResult> {
	const response = await fetch(`/Api/Bot/${botNames}`, {
		headers: {
			'Content-Type': 'application/json',
			...(ipcPassword ? { Authentication: ipcPassword } : {})
		}
	});
	const data = await response.json();
	return data;
}
