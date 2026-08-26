import { describe, expect, it, vi, beforeEach } from 'vitest';
import { checkMaiQuotaAvailable } from './maiAccountStore.js';
import type { ShellSettings } from './settingsStore.js';

describe('checkMaiQuotaAvailable', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('returns available: true when no mAI account is configured', async () => {
		const settings: ShellSettings = {};
		const result = await checkMaiQuotaAvailable(settings);
		expect(result.available).toBe(true);
	});

	it('returns available: false with warning message when local cached usage is exhausted', async () => {
		const settings: ShellSettings = {
			maiAccount: {
				jwtToken: 'mock-jwt-token',
				usage: {
					tokensUsed: 5000000,
					limit: 5000000,
					resetAt: '2026-08-31T00:00:00Z',
				},
			},
		};

		const result = await checkMaiQuotaAvailable(settings, false);
		expect(result.available).toBe(false);
		expect(result.message).toContain('épuisé');
	});

	it('returns available: true when local cached usage is within limits', async () => {
		const settings: ShellSettings = {
			maiAccount: {
				jwtToken: 'mock-jwt-token',
				usage: {
					tokensUsed: 1000,
					limit: 5000000,
				},
			},
		};

		const result = await checkMaiQuotaAvailable(settings, false);
		expect(result.available).toBe(true);
	});

	it('performs fresh check via API when forceFresh is true', async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tokensUsed: 6000000,
				limit: 5000000,
				resetAt: '2026-09-01T00:00:00Z',
			}),
		});
		vi.stubGlobal('fetch', fetchMock);

		const settings: ShellSettings = {
			maiAccount: {
				jwtToken: 'mock-jwt-token',
				usage: {
					tokensUsed: 100,
					limit: 5000000,
				},
			},
		};

		const result = await checkMaiQuotaAvailable(settings, true);
		expect(fetchMock).toHaveBeenCalled();
		expect(result.available).toBe(false);
		expect(result.message).toContain('épuisé');
	});
});
