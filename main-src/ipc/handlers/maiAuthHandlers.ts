import { ipcMain } from 'electron';
import { getSettings } from '../../settingsStore.js';
import {
	maiLogin,
	maiLogout,
	maiRegister,
	maiResendCode,
	maiVerifyLogin,
	maiVerifyRegister,
	syncMaiAccountWithToken,
} from '../../maiAccountStore.js';

export function registerMaiAuthHandlers(): void {
	ipcMain.handle('mai:getAccount', () => {
		return getSettings().maiAccount ?? {};
	});

	ipcMain.handle('mai:login', async (_e, payload: { identifier: string; password: string }) => {
		return await maiLogin(payload.identifier, payload.password);
	});

	ipcMain.handle('mai:verifyLogin', async (_e, payload: { email: string; code: string }) => {
		return await maiVerifyLogin(payload.email, payload.code);
	});

	ipcMain.handle('mai:register', async (_e, payload: { email: string; username: string; password: string }) => {
		return await maiRegister(payload.email, payload.username, payload.password);
	});

	ipcMain.handle('mai:verifyRegister', async (_e, payload: { email: string; username: string; password: string; code: string }) => {
		return await maiVerifyRegister(payload.email, payload.username, payload.password, payload.code);
	});

	ipcMain.handle('mai:resendCode', async (_e, payload: { email: string; action: 'login' | 'register' }) => {
		return await maiResendCode(payload.email, payload.action);
	});

	ipcMain.handle('mai:refreshUsage', async () => {
		const account = getSettings().maiAccount;
		if (!account?.jwtToken) {
			return { ok: false, message: 'Non authentifié.' };
		}
		const updated = await syncMaiAccountWithToken(account.jwtToken);
		return { ok: true, account: updated };
	});

	ipcMain.handle('mai:logout', () => {
		return maiLogout();
	});
}
