import React, { useState, useEffect, useCallback } from 'react';
import { useI18n } from './i18n';
import type { MaiAccountState } from './ipcTypes';

type Props = {
	open: boolean;
	onClose: () => void;
	shell: NonNullable<Window['asyncShell']> | undefined;
	account: MaiAccountState | undefined;
	onAccountChange: (account: MaiAccountState) => void;
};

export function MaiAccountModal({ open, onClose, shell, account, onAccountChange }: Props) {
	const { t } = useI18n();
	const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
	const [step, setStep] = useState<'form' | 'otp'>('form');

	// Form inputs
	const [identifier, setIdentifier] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [otpCode, setOtpCode] = useState('');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const isLoggedIn = Boolean(account?.jwtToken);

	const resetForm = useCallback(() => {
		setIdentifier('');
		setEmail('');
		setUsername('');
		setPassword('');
		setOtpCode('');
		setError(null);
		setSuccessMsg(null);
		setStep('form');
	}, []);

	useEffect(() => {
		if (open) {
			resetForm();
			if (isLoggedIn && shell) {
				// Refresh profile & usage on open
				void shell.invoke('mai:refreshUsage').then((res: any) => {
					if (res?.ok && res?.account) {
						onAccountChange(res.account);
					}
				});
			}
		}
	}, [open, isLoggedIn, shell, onAccountChange, resetForm]);

	if (!open) return null;

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!shell) return;
		setError(null);
		setLoading(true);
		try {
			const res = (await shell.invoke('mai:login', { identifier, password })) as any;
			if (!res.ok) {
				setError(res.message || 'Erreur lors de la connexion.');
			} else {
				setEmail(res.email || identifier);
				setStep('otp');
				setSuccessMsg(t('mai.needVerification'));
			}
		} catch (err: any) {
			setError(err.message || 'Erreur réseau.');
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!shell) return;
		setError(null);
		setLoading(true);
		try {
			const res = (await shell.invoke('mai:register', { email, username, password })) as any;
			if (!res.ok) {
				setError(res.message || 'Erreur lors de l\'inscription.');
			} else {
				setStep('otp');
				setSuccessMsg(t('mai.needVerification'));
			}
		} catch (err: any) {
			setError(err.message || 'Erreur réseau.');
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!shell) return;
		setError(null);
		setLoading(true);
		try {
			let res: any;
			if (activeTab === 'login') {
				res = await shell.invoke('mai:verifyLogin', { email, code: otpCode });
			} else {
				res = await shell.invoke('mai:verifyRegister', { email, username, password, code: otpCode });
			}

			if (!res.ok) {
				setError(res.message || 'Code de vérification invalide.');
			} else {
				if (res.account) {
					onAccountChange(res.account);
				}
				setSuccessMsg(activeTab === 'login' ? t('mai.loginSuccess') : t('mai.registerSuccess'));
				setTimeout(() => {
					onClose();
				}, 1000);
			}
		} catch (err: any) {
			setError(err.message || 'Erreur de validation.');
		} finally {
			setLoading(false);
		}
	};

	const handleResendOtp = async () => {
		if (!shell || !email) return;
		setError(null);
		setLoading(true);
		try {
			const res = (await shell.invoke('mai:resendCode', { email, action: activeTab })) as any;
			if (res.ok) {
				setSuccessMsg('Nouveau code envoyé avec succès !');
			} else {
				setError(res.message || 'Impossible de renvoyer le code.');
			}
		} catch (err: any) {
			setError(err.message || 'Erreur réseau.');
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		if (!shell) return;
		const next = (await shell.invoke('mai:logout')) as any;
		onAccountChange(next ?? {});
		resetForm();
	};

	const handleRefreshUsage = async () => {
		if (!shell) return;
		setLoading(true);
		try {
			const res = (await shell.invoke('mai:refreshUsage')) as any;
			if (res?.ok && res?.account) {
				onAccountChange(res.account);
			}
		} finally {
			setLoading(false);
		}
	};

	const user = account?.user;
	const usage = account?.usage;
	const tokensUsed = usage?.tokensUsed ?? 0;
	const limit = usage?.limit ?? 5_000_000;
	const usagePercent = Math.min(100, Math.round((tokensUsed / (limit || 1)) * 100));

	const formattedTokens = new Intl.NumberFormat('fr-FR').format(tokensUsed);
	const formattedLimit = new Intl.NumberFormat('fr-FR').format(limit);

	const resetDateStr = usage?.resetAt
		? new Date(usage.resetAt).toLocaleDateString('fr-FR', {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				hour: '2-digit',
				minute: '2-digit',
		  })
		: undefined;

	return (
		<div className="ref-modal-backdrop" onClick={onClose} style={{ zIndex: 10000 }}>
			<div
				className="ref-modal-card ref-modal-card--mai"
				onClick={(e) => e.stopPropagation()}
				style={{
					maxWidth: 480,
					width: '90vw',
					borderRadius: 14,
					background: 'var(--bg-app-overlay, #18181b)',
					border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
					boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
					color: 'var(--fg-default, #f4f4f5)',
					overflow: 'hidden',
					padding: 0,
				}}
			>
				{/* Modal Header */}
				<div
					style={{
						padding: '16px 20px',
						borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						background: 'var(--bg-subtle, rgba(255,255,255,0.02))',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
						<div
							style={{
								width: 28,
								height: 28,
								borderRadius: 8,
								background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontWeight: 700,
								fontSize: 13,
								color: '#fff',
							}}
						>
							m
						</div>
						<span style={{ fontWeight: 600, fontSize: 16 }}>{t('mai.accountTitle')}</span>
					</div>
					<button
						type="button"
						onClick={onClose}
						style={{
							background: 'transparent',
							border: 'none',
							color: 'var(--fg-muted, #a1a1aa)',
							cursor: 'pointer',
							fontSize: 18,
							lineHeight: 1,
							padding: 4,
						}}
					>
						✕
					</button>
				</div>

				{/* Modal Body */}
				<div style={{ padding: 24 }}>
					{error ? (
						<div
							style={{
								padding: '10px 14px',
								marginBottom: 16,
								borderRadius: 8,
								background: 'rgba(239, 68, 68, 0.15)',
								border: '1px solid rgba(239, 68, 68, 0.3)',
								color: '#fca5a5',
								fontSize: 13,
							}}
						>
							{error}
						</div>
					) : null}

					{successMsg ? (
						<div
							style={{
								padding: '10px 14px',
								marginBottom: 16,
								borderRadius: 8,
								background: 'rgba(34, 197, 94, 0.15)',
								border: '1px solid rgba(34, 197, 94, 0.3)',
								color: '#86efac',
								fontSize: 13,
							}}
						>
							{successMsg}
						</div>
					) : null}

					{isLoggedIn ? (
						/* Profile View */
						<div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 16,
									padding: 16,
									borderRadius: 12,
									background: 'rgba(255, 255, 255, 0.04)',
									border: '1px solid rgba(255, 255, 255, 0.08)',
									marginBottom: 20,
								}}
							>
								{user?.avatarUrl ? (
									<img
										src={user.avatarUrl}
										alt={user.username || 'Avatar'}
										style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
									/>
								) : (
									<div
										style={{
											width: 56,
											height: 56,
											borderRadius: '50%',
											background: 'linear-gradient(135deg, #6366f1, #a855f7)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 22,
											fontWeight: 700,
											color: '#fff',
										}}
									>
										{(user?.username || user?.email || 'M').charAt(0).toUpperCase()}
									</div>
								)}

								<div style={{ flex: 1, minWidth: 0 }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
										<span style={{ fontWeight: 600, fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
											{user?.username || 'Utilisateur mAI'}
										</span>
										<span
											style={{
												fontSize: 11,
												fontWeight: 700,
												textTransform: 'uppercase',
												padding: '2px 8px',
												borderRadius: 999,
												background: user?.tier === 'Pro' || user?.tier === 'Max' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
												color: '#fff',
											}}
										>
											{user?.tier || 'Free'}
										</span>
									</div>
									<div style={{ fontSize: 13, color: 'var(--fg-muted, #a1a1aa)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
										{user?.email || 'compte@mai.val.run'}
									</div>
								</div>
							</div>

							{/* Usage progress card */}
							<div
								style={{
									padding: 16,
									borderRadius: 12,
									background: 'rgba(255, 255, 255, 0.04)',
									border: '1px solid rgba(255, 255, 255, 0.08)',
									marginBottom: 20,
								}}
							>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
									<span style={{ fontSize: 13, fontWeight: 500 }}>{t('mai.usage')}</span>
									<span style={{ fontSize: 12, color: usagePercent > 85 ? '#ef4444' : '#60a5fa', fontWeight: 600 }}>
										{usagePercent}%
									</span>
								</div>

								{/* Progress Bar */}
								<div
									style={{
										height: 8,
										borderRadius: 4,
										background: 'rgba(255,255,255,0.1)',
										overflow: 'hidden',
										marginBottom: 10,
									}}
								>
									<div
										style={{
											height: '100%',
											width: `${usagePercent}%`,
											background:
												usagePercent > 90
													? '#ef4444'
													: usagePercent > 70
														? '#f59e0b'
														: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
											borderRadius: 4,
											transition: 'width 0.3s ease',
										}}
									/>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-muted, #a1a1aa)' }}>
									<span>{formattedTokens} / {formattedLimit} tokens</span>
									{resetDateStr ? <span>{t('mai.resetAt')} {resetDateStr}</span> : null}
								</div>
							</div>

							{/* Actions */}
							<div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
								<button
									type="button"
									onClick={handleRefreshUsage}
									disabled={loading}
									style={{
										padding: '8px 14px',
										borderRadius: 8,
										background: 'rgba(255,255,255,0.06)',
										border: '1px solid rgba(255,255,255,0.1)',
										color: 'var(--fg-default, #fff)',
										cursor: 'pointer',
										fontSize: 13,
										fontWeight: 500,
									}}
								>
									{loading ? t('mai.submitting') : t('common.refresh')}
								</button>
								<button
									type="button"
									onClick={handleLogout}
									style={{
										padding: '8px 14px',
										borderRadius: 8,
										background: 'rgba(239, 68, 68, 0.1)',
										border: '1px solid rgba(239, 68, 68, 0.25)',
										color: '#fca5a5',
										cursor: 'pointer',
										fontSize: 13,
										fontWeight: 500,
									}}
								>
									{t('mai.logout')}
								</button>
							</div>
						</div>
					) : step === 'otp' ? (
						/* OTP Verification Screen */
						<form onSubmit={handleVerifyOtp}>
							<p style={{ fontSize: 13, color: 'var(--fg-muted, #a1a1aa)', marginBottom: 16 }}>
								{t('mai.enterOtp')} : <strong>{email}</strong>
							</p>

							<div style={{ marginBottom: 16 }}>
								<label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
									{t('mai.otpCode')}
								</label>
								<input
									type="text"
									value={otpCode}
									onChange={(e) => setOtpCode(e.target.value)}
									placeholder="123456"
									maxLength={8}
									required
									autoFocus
									style={{
										width: '100%',
										padding: '10px 12px',
										borderRadius: 8,
										background: 'rgba(255,255,255,0.05)',
										border: '1px solid rgba(255,255,255,0.15)',
										color: '#fff',
										fontSize: 18,
										letterSpacing: '0.2em',
										textAlign: 'center',
										fontFamily: 'monospace',
										outline: 'none',
									}}
								/>
							</div>

							<button
								type="submit"
								disabled={loading || !otpCode.trim()}
								style={{
									width: '100%',
									padding: '10px 16px',
									borderRadius: 8,
									background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
									border: 'none',
									color: '#fff',
									fontWeight: 600,
									fontSize: 14,
									cursor: loading ? 'not-allowed' : 'pointer',
									marginBottom: 12,
								}}
							>
								{loading ? t('mai.submitting') : t('mai.verify')}
							</button>

							<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
								<button
									type="button"
									onClick={() => setStep('form')}
									style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: 0 }}
								>
									{t('common.back')}
								</button>
								<button
									type="button"
									onClick={handleResendOtp}
									disabled={loading}
									style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: 0 }}
								>
									{t('mai.resendCode')}
								</button>
							</div>
						</form>
					) : (
						/* Login / Register Form */
						<div>
							{/* Tabs */}
							<div
								style={{
									display: 'flex',
									borderRadius: 8,
									background: 'rgba(255,255,255,0.05)',
									padding: 3,
									marginBottom: 20,
								}}
							>
								<button
									type="button"
									onClick={() => { setActiveTab('login'); setError(null); }}
									style={{
										flex: 1,
										padding: '6px 0',
										borderRadius: 6,
										border: 'none',
										background: activeTab === 'login' ? 'rgba(255,255,255,0.15)' : 'transparent',
										color: activeTab === 'login' ? '#fff' : 'var(--fg-muted, #a1a1aa)',
										fontWeight: activeTab === 'login' ? 600 : 400,
										fontSize: 13,
										cursor: 'pointer',
									}}
								>
									{t('mai.login')}
								</button>
								<button
									type="button"
									onClick={() => { setActiveTab('register'); setError(null); }}
									style={{
										flex: 1,
										padding: '6px 0',
										borderRadius: 6,
										border: 'none',
										background: activeTab === 'register' ? 'rgba(255,255,255,0.15)' : 'transparent',
										color: activeTab === 'register' ? '#fff' : 'var(--fg-muted, #a1a1aa)',
										fontWeight: activeTab === 'register' ? 600 : 400,
										fontSize: 13,
										cursor: 'pointer',
									}}
								>
									{t('mai.register')}
								</button>
							</div>

							{activeTab === 'login' ? (
								<form onSubmit={handleLogin}>
									<div style={{ marginBottom: 14 }}>
										<label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
											{t('mai.identifier')}
										</label>
										<input
											type="text"
											value={identifier}
											onChange={(e) => setIdentifier(e.target.value)}
											placeholder="email@example.com ou pseudo"
											required
											style={{
												width: '100%',
												padding: '9px 12px',
												borderRadius: 8,
												background: 'rgba(255,255,255,0.05)',
												border: '1px solid rgba(255,255,255,0.15)',
												color: '#fff',
												fontSize: 13,
												outline: 'none',
											}}
										/>
									</div>

									<div style={{ marginBottom: 20 }}>
										<label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
											{t('mai.password')}
										</label>
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="••••••••"
											required
											style={{
												width: '100%',
												padding: '9px 12px',
												borderRadius: 8,
												background: 'rgba(255,255,255,0.05)',
												border: '1px solid rgba(255,255,255,0.15)',
												color: '#fff',
												fontSize: 13,
												outline: 'none',
											}}
										/>
									</div>

									<button
										type="submit"
										disabled={loading || !identifier.trim() || !password}
										style={{
											width: '100%',
											padding: '10px 16px',
											borderRadius: 8,
											background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
											border: 'none',
											color: '#fff',
											fontWeight: 600,
											fontSize: 14,
											cursor: loading ? 'not-allowed' : 'pointer',
										}}
									>
										{loading ? t('mai.submitting') : t('mai.login')}
									</button>
								</form>
							) : (
								<form onSubmit={handleRegister}>
									<div style={{ marginBottom: 14 }}>
										<label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
											{t('mai.email')}
										</label>
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="votre@email.com"
											required
											style={{
												width: '100%',
												padding: '9px 12px',
												borderRadius: 8,
												background: 'rgba(255,255,255,0.05)',
												border: '1px solid rgba(255,255,255,0.15)',
												color: '#fff',
												fontSize: 13,
												outline: 'none',
											}}
										/>
									</div>

									<div style={{ marginBottom: 14 }}>
										<label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
											{t('mai.username')}
										</label>
										<input
											type="text"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											placeholder="mon_pseudo"
											required
											style={{
												width: '100%',
												padding: '9px 12px',
												borderRadius: 8,
												background: 'rgba(255,255,255,0.05)',
												border: '1px solid rgba(255,255,255,0.15)',
												color: '#fff',
												fontSize: 13,
												outline: 'none',
											}}
										/>
									</div>

									<div style={{ marginBottom: 20 }}>
										<label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
											{t('mai.password')}
										</label>
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Au moins 6 caractères"
											required
											minLength={6}
											style={{
												width: '100%',
												padding: '9px 12px',
												borderRadius: 8,
												background: 'rgba(255,255,255,0.05)',
												border: '1px solid rgba(255,255,255,0.15)',
												color: '#fff',
												fontSize: 13,
												outline: 'none',
											}}
										/>
									</div>

									<button
										type="submit"
										disabled={loading || !email.trim() || !username.trim() || !password}
										style={{
											width: '100%',
											padding: '10px 16px',
											borderRadius: 8,
											background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
											border: 'none',
											color: '#fff',
											fontWeight: 600,
											fontSize: 14,
											cursor: loading ? 'not-allowed' : 'pointer',
										}}
									>
										{loading ? t('mai.submitting') : t('mai.register')}
									</button>
								</form>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
