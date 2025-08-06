export interface BotDetail {
	BotName: string;
	IsConnectedAndLoggedOn: boolean;
	IsPlayingPossible: boolean;
	PublicIP: string;
	s_SteamID: string;
	AccountFlags: number;
	AvatarHash: string | null;
	KeepRunning: boolean;
	Nickname: string;
	SteamID: number;
	WalletBalance: number;
	WalletBalanceDelayed: number;
	WalletCurrency: number;
}

export interface Result {
	[botName: string]: BotDetail;
}

export interface IpcGetBotsResponse  {
	Result: Result;
	Message: string;
	Success: boolean;
}
