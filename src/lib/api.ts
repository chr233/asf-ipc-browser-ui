/*
 * @Author       : Chr_
 * @Date         : 2025-08-01 16:56:44
 * @LastEditors  : Chr_
 * @LastEditTime : 2025-08-06 23:09:09
 * @Description  :
 */

import type { IpcGetBotsResponse } from './models/IpcGetBotsResponse';
import type { IpcBasicResponse } from './models/IpcBasicResponse';
import type { IpcGetProxyResponse } from './models/IpcGetProxyResponse';

async function baseRequest<T>(
	method: string = 'GET',
	uri: string = '',
	ipcPassword?: string
): Promise<T> {
	const response = await fetch(uri, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(ipcPassword ? { Authentication: ipcPassword } : {})
		}
	});
	const data = await response.json();
	return data;
}

export async function getBotStatus(
	botNames: string = 'ASF',
	ipcPassword?: string
): Promise<IpcGetBotsResponse> {
	const response = await baseRequest<IpcGetBotsResponse>(
		'GET',
		`/Api/Bot/${botNames}`,
		ipcPassword
	);
	return response;
}

export async function startBots(
	botNames: string = 'ASF',
	ipcPassword?: string
): Promise<IpcBasicResponse> {
	const response = await baseRequest<IpcBasicResponse>(
		'POST',
		`/Api/Bot/${botNames}/start`,
		ipcPassword
	);
	return response;
}

export async function stopBots(
	botNames: string = 'ASF',
	ipcPassword?: string
): Promise<IpcBasicResponse> {
	const response = await baseRequest<IpcBasicResponse>(
		'POST',
		`/Api/Bot/${botNames}/stop`,
		ipcPassword
	);
	return response;
}

export async function getStartPage(
	botName: string,
	url: string,
	ipcPassword?: string,
	realHost?:string
): Promise<IpcGetProxyResponse> {
	const response = await baseRequest<IpcGetProxyResponse>(
		'GET',
		`/Api/Proxy/GetEndpoint/${botName}?url=${url}&realHost=${realHost}`,
		ipcPassword
	);
	return response;
}
