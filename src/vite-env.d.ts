/// <reference types="vite/client" />
import type * as React from 'react';

export interface MaiShellAPI {
	invoke(channel: string, ...args: unknown[]): Promise<unknown>;
	setUnreadBadgeCount?(count: number): Promise<unknown>;
	getPathForFile?(file: File): string | null;
	subscribeChat(callback: (payload: unknown) => void): () => void;
	subscribeLayout?(callback: () => void): () => void;
	subscribeThemeMode?(callback: (payload: unknown) => void): () => void;
	subscribeWorkspaceFsTouched?(callback: () => void): () => void;
	subscribeWorkspaceFileIndexReady?(callback: (workspaceRootNorm: string) => void): () => void;
	subscribePluginsChanged?(callback: () => void): () => void;
	subscribeBrowserNewWindow?(callback: (payload: { url: string; disposition?: string }) => void): () => void;
	subscribeGoogleLoginExternal?(callback: (payload: { url: string; error?: string | null }) => void): () => void;
	subscribeBrowserControl?(callback: (payload: unknown) => void): () => void;
	subscribeTerminalSessionData?(callback: (id: string, data: string, seq: number) => void): () => void;
	subscribeTerminalSessionAuthPrompt?(
		callback: (
			id: string,
			prompt: { prompt: string; kind: 'password' | 'passphrase'; seq: number } | null
		) => void
	): () => void;
	subscribeTerminalSessionExit?(callback: (id: string, code: unknown) => void): () => void;
	subscribeTerminalSessionListChanged?(callback: () => void): () => void;
	subscribeOpenSettingsNav?(callback: (nav: string) => void): () => void;
	subscribeComposerAppendDraft?(callback: (payload: { text?: string } | string) => void): () => void;
	subscribeCaptureAnalysisDispatch?(
		callback: (payload: {
			prompt?: string;
			mode?: string;
			sourceUrl?: string;
			scope?: string;
		}) => void
	): () => void;
	subscribeTrayCommand?(callback: (payload: { command?: string }) => void): () => void;
	subscribeAutoUpdateStatus?(callback: (payload: { state: string } & Record<string, unknown>) => void): () => void;
	subscribeMaiAccount?(callback: (payload: any) => void): () => void;
}
// Alias rétro-compatibilité
export type AsyncShellAPI = MaiShellAPI;

declare global {
	interface MaiShellWebviewElement extends HTMLElement {
		canGoBack(): boolean;
		canGoForward(): boolean;
		capturePage(): Promise<{
			toDataURL(): string;
			getSize(): { width: number; height: number };
		}>;
		executeJavaScript<T = unknown>(code: string, userGesture?: boolean): Promise<T>;
		getWebContentsId(): number;
		goBack(): void;
		goForward(): void;
		getUserAgent(): string;
		reload(): void;
		setUserAgent(userAgent: string): void;
		stop(): void;
		getURL(): string;
		loadURL(url: string, options?: Record<string, unknown>): Promise<void>;
	}
	interface AsyncShellWebviewElement extends HTMLElement {
		canGoBack(): boolean;
		canGoForward(): boolean;
		capturePage(): Promise<{
			toDataURL(): string;
			getSize(): { width: number; height: number };
		}>;
		executeJavaScript<T = unknown>(code: string, userGesture?: boolean): Promise<T>;
		getWebContentsId(): number;
		goBack(): void;
		goForward(): void;
		getUserAgent(): string;
		reload(): void;
		setUserAgent(userAgent: string): void;
		stop(): void;
		getURL(): string;
		loadURL(url: string, options?: Record<string, unknown>): Promise<void>;
	}

	namespace JSX {
		interface IntrinsicElements {
			webview: React.DetailedHTMLProps<React.WebViewHTMLAttributes<MaiShellWebviewElement>, MaiShellWebviewElement>;
		}
	}

	interface Window {
		maiShell?: MaiShellAPI;
		asyncShell?: MaiShellAPI;
		__voidShellTabCloseLog?: Array<{ iso: string; tag: string; detail: Record<string, unknown> }>;
	}
}

export {};
