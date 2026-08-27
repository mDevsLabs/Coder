import React, { useState, useEffect, useCallback } from 'react';
import { BrandLogo } from './BrandLogo';
import {
	IconAlertTriangle,
	IconCalendar,
	IconCheckCircle,
	IconClock,
	IconCloseSmall,
	IconEye,
	IconEyeOff,
	IconLock,
	IconLogOut,
	IconMail,
	IconRefresh,
	IconUser,
} from './icons';
import { useI18n } from './i18n';
import type { MaiAccountState } from './ipcTypes';

type Props = {
	open: boolean;
	onClose: () => void;
	shell: NonNullable<Window['maiShell']> | undefined;
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
	const [showPassword, setShowPassword] = useState(false);
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
		setShowPassword(false);
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

	useEffect(() => {
		if (!open) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				onClose();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [open, onClose]);

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
				setSuccessMsg(t('mai.needVerification') || 'Un code de confirmation a été envoyé par email.');
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
				setSuccessMsg(t('mai.needVerification') || 'Un code de confirmation a été envoyé par email.');
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
				res = await shell.invoke('mai:verifyLogin', { email, code: otpCode.trim() });
			} else {
				res = await shell.invoke('mai:verifyRegister', { email, username, password, code: otpCode.trim() });
			}

			if (!res.ok) {
				setError(res.message || 'Code de vérification invalide.');
			} else {
				if (res.account) {
					onAccountChange(res.account);
				}
				setSuccessMsg(activeTab === 'login' ? (t('mai.loginSuccess') || 'Connexion réussie !') : (t('mai.registerSuccess') || 'Compte créé avec succès !'));
				setTimeout(() => {
					onClose();
				}, 900);
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
				setSuccessMsg('Données d\'usage actualisées !');
				setTimeout(() => setSuccessMsg(null), 3000);
			}
		} finally {
			setLoading(false);
		}
	};

	const user = account?.user;
	const usage = account?.usage;
	const tokensUsed = usage?.tokensUsed ?? 0;
	const limit = usage?.limit ?? 5_000_000;
	const remainingTokens = Math.max(0, limit - tokensUsed);
	const usagePercent = Math.min(100, Math.round((tokensUsed / (limit || 1)) * 100));

	const formattedTokens = new Intl.NumberFormat('fr-FR').format(tokensUsed);
	const formattedLimit = new Intl.NumberFormat('fr-FR').format(limit);
	const formattedRemaining = new Intl.NumberFormat('fr-FR').format(remainingTokens);

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
		<div
			className="ref-modal-backdrop"
			onClick={onClose}
			style={{
				position: 'fixed',
				inset: 0,
				background: 'rgba(0, 0, 0, 0.72)',
				backdropFilter: 'blur(10px)',
				WebkitBackdropFilter: 'blur(10px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 10000,
				padding: 16,
			}}
		>
			<div
				className="ref-modal-card ref-modal-card--mai"
				onClick={(e) => e.stopPropagation()}
				style={{
					maxWidth: 500,
					width: '100%',
					borderRadius: 18,
					background: 'linear-gradient(180deg, #181b22 0%, #11141a 100%)',
					border: '1px solid rgba(255, 255, 255, 0.12)',
					boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
					color: 'var(--fg-default, #f4f4f5)',
					overflow: 'hidden',
					padding: 0,
					animation: 'modal-pop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
				}}
			>
				{/* Modal Header */}
				<div
					style={{
						padding: '18px 24px',
						borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						background: 'rgba(255, 255, 255, 0.02)',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<BrandLogo size={32} aria-label="mAI Coder" />
						<div>
							<div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: '#fff' }}>
								{isLoggedIn ? 'Compte mAI Coder' : 'Authentification mAI Coder'}
							</div>
							<div style={{ fontSize: 12, color: 'var(--fg-muted, #a1a1aa)' }}>
								{isLoggedIn ? 'Gérez vos crédits et votre abonnement' : 'Connectez-vous pour débloquer la puissance des agents'}
							</div>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						style={{
							background: 'rgba(255, 255, 255, 0.06)',
							border: '1px solid rgba(255, 255, 255, 0.08)',
							borderRadius: 8,
							color: 'var(--fg-muted, #a1a1aa)',
							cursor: 'pointer',
							fontSize: 14,
							width: 30,
							height: 30,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transition: 'all 0.15s ease',
						}}
						title={t('common.close') || 'Fermer'}
					>
						<IconCloseSmall />
					</button>
				</div>

				{/* Modal Body */}
				<div style={{ padding: 24 }}>
					{error ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								padding: '12px 16px',
								marginBottom: 20,
								borderRadius: 10,
								background: 'rgba(239, 68, 68, 0.14)',
								border: '1px solid rgba(239, 68, 68, 0.3)',
								color: '#fca5a5',
								fontSize: 13,
							}}
						>
							<span style={{ display: 'inline-flex', flexShrink: 0 }} aria-hidden>
								<IconAlertTriangle />
							</span>
							<span style={{ flex: 1 }}>{error}</span>
						</div>
					) : null}

					{successMsg ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								padding: '12px 16px',
								marginBottom: 20,
								borderRadius: 10,
								background: 'rgba(34, 197, 94, 0.14)',
								border: '1px solid rgba(34, 197, 94, 0.3)',
								color: '#86efac',
								fontSize: 13,
							}}
						>
							<span style={{ display: 'inline-flex', flexShrink: 0 }} aria-hidden>
								<IconCheckCircle />
							</span>
							<span style={{ flex: 1 }}>{successMsg}</span>
						</div>
					) : null}

					{isLoggedIn ? (
						/* Profile View */
						<div>
							{/* User Profile Card */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 16,
									padding: '18px 20px',
									borderRadius: 14,
									background: 'rgba(255, 255, 255, 0.04)',
									border: '1px solid rgba(255, 255, 255, 0.08)',
									marginBottom: 20,
								}}
							>
								{user?.avatarUrl ? (
									<img
										src={user.avatarUrl}
										alt={user.username || 'Avatar'}
										style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(59, 130, 246, 0.4)' }}
									/>
								) : (
									<div
										style={{
											width: 56,
											height: 56,
											borderRadius: '50%',
											background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 22,
											fontWeight: 700,
											color: '#fff',
											boxShadow: '0 6px 18px rgba(99, 102, 241, 0.3)',
										}}
									>
										{(user?.username || user?.email || 'M').charAt(0).toUpperCase()}
									</div>
								)}

								<div style={{ flex: 1, minWidth: 0 }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
										<span style={{ fontWeight: 700, fontSize: 17, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#fff' }}>
											{user?.username || 'Utilisateur mAI'}
										</span>
										<span
											style={{
												fontSize: 11,
												fontWeight: 800,
												textTransform: 'uppercase',
												padding: '3px 9px',
												borderRadius: 999,
												background: user?.tier === 'Pro' || user?.tier === 'Max' ? 'linear-gradient(135deg, #3b82f6, #60a5fa)' : 'rgba(255,255,255,0.12)',
												color: '#fff',
												letterSpacing: '0.05em',
												boxShadow: user?.tier === 'Pro' || user?.tier === 'Max' ? '0 2px 8px rgba(59, 130, 246, 0.4)' : 'none',
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

							{/* Detailed Usage progress card */}
							<div
								style={{
									padding: '20px',
									borderRadius: 14,
									background: 'rgba(255, 255, 255, 0.03)',
									border: '1px solid rgba(255, 255, 255, 0.08)',
									marginBottom: 24,
								}}
							>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
									<div>
										<span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{t('mai.usage') || 'Consommation de tokens'}</span>
										<div style={{ fontSize: 12, color: 'var(--fg-muted, #a1a1aa)', marginTop: 2 }}>
											{formattedRemaining} tokens restants
										</div>
									</div>
									<div
										style={{
											fontSize: 13,
											fontWeight: 700,
											padding: '3px 8px',
											borderRadius: 6,
											background: usagePercent > 85 ? 'rgba(239, 68, 68, 0.2)' : usagePercent > 70 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
											color: usagePercent > 85 ? '#ef4444' : usagePercent > 70 ? '#f59e0b' : '#60a5fa',
										}}
									>
										{usagePercent}%
									</div>
								</div>

								{/* Progress Bar */}
								<div
									style={{
										height: 10,
										borderRadius: 5,
										background: 'rgba(255, 255, 255, 0.08)',
										overflow: 'hidden',
										marginBottom: 12,
									}}
								>
									<div
										style={{
											height: '100%',
											width: `${usagePercent}%`,
											background:
												usagePercent > 90
													? 'linear-gradient(90deg, #f87171, #ef4444)'
													: usagePercent > 70
														? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
														: 'linear-gradient(90deg, #38bdf8, #3b82f6)',
											borderRadius: 5,
											transition: 'width 0.4s ease',
										}}
									/>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-muted, #a1a1aa)', flexWrap: 'wrap', gap: 6 }}>
									<span><strong>{formattedTokens}</strong> / {formattedLimit} tokens</span>
									{resetDateStr ? (
										<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
											<IconCalendar /> Reset : {resetDateStr}
										</span>
									) : null}
								</div>
							</div>

							{/* Actions */}
							<div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
								<button
									type="button"
									onClick={handleRefreshUsage}
									disabled={loading}
									style={{
										padding: '9px 16px',
										borderRadius: 8,
										background: 'rgba(255, 255, 255, 0.06)',
										border: '1px solid rgba(255, 255, 255, 0.12)',
										color: 'var(--fg-default, #fff)',
										cursor: 'pointer',
										fontSize: 13,
										fontWeight: 600,
										display: 'flex',
										alignItems: 'center',
										gap: 6,
									}}
								>
									{loading ? (
										<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
											<IconClock /> Actualisation…
										</span>
									) : (
										<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
											<IconRefresh /> {t('common.refresh') || 'Actualiser'}
										</span>
									)}
								</button>
								<button
									type="button"
									onClick={handleLogout}
									style={{
										padding: '9px 16px',
										borderRadius: 8,
										background: 'rgba(239, 68, 68, 0.12)',
										border: '1px solid rgba(239, 68, 68, 0.25)',
										color: '#fca5a5',
										cursor: 'pointer',
										fontSize: 13,
										fontWeight: 600,
										display: 'flex',
										alignItems: 'center',
										gap: 6,
									}}
								>
									<IconLogOut /> {t('mai.logout') || 'Se déconnecter'}
								</button>
							</div>
						</div>
					) : step === 'otp' ? (
						/* OTP Verification Screen */
						<form onSubmit={handleVerifyOtp}>
							<div
								style={{
									textAlign: 'center',
									padding: '16px 0 20px',
								}}
							>
								<div
									style={{
										width: 52,
										height: 52,
										borderRadius: '50%',
										background: 'rgba(59, 130, 246, 0.15)',
										border: '1px solid rgba(59, 130, 246, 0.3)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#60a5fa',
										margin: '0 auto 14px',
									}}
								>
									<IconMail />
								</div>
								<h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 6px', color: '#fff' }}>
									Vérification par email
								</h3>
								<p style={{ fontSize: 13, color: 'var(--fg-muted, #a1a1aa)', margin: 0 }}>
									Saisissez le code à 6 chiffres envoyé à<br />
									<strong style={{ color: '#fff' }}>{email}</strong>
								</p>
							</div>

							<div style={{ marginBottom: 20 }}>
								<input
									type="text"
									value={otpCode}
									onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
									placeholder="••••••"
									maxLength={8}
									required
									autoFocus
									style={{
										width: '100%',
										padding: '14px 16px',
										borderRadius: 10,
										background: 'rgba(255, 255, 255, 0.05)',
										border: '1px solid rgba(59, 130, 246, 0.4)',
										color: '#fff',
										fontSize: 24,
										fontWeight: 700,
										letterSpacing: '0.35em',
										textAlign: 'center',
										fontFamily: 'monospace',
										outline: 'none',
										boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
									}}
								/>
							</div>

							<button
								type="submit"
								disabled={loading || !otpCode.trim()}
								style={{
									width: '100%',
									padding: '12px 16px',
									borderRadius: 10,
									background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
									border: 'none',
									color: '#fff',
									fontWeight: 700,
									fontSize: 14,
									cursor: loading || !otpCode.trim() ? 'not-allowed' : 'pointer',
									marginBottom: 16,
									boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
									opacity: loading || !otpCode.trim() ? 0.6 : 1,
									transition: 'all 0.15s ease',
								}}
							>
								{loading ? 'Vérification en cours…' : (t('mai.verify') || 'Valider le code')}
							</button>

							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
								<button
									type="button"
									onClick={() => setStep('form')}
									style={{
										background: 'none',
										border: 'none',
										color: 'var(--fg-muted, #a1a1aa)',
										cursor: 'pointer',
										padding: '4px 0',
										display: 'flex',
										alignItems: 'center',
										gap: 4,
									}}
								>
									← {t('common.back') || 'Retour'}
								</button>
								<button
									type="button"
									onClick={handleResendOtp}
									disabled={loading}
									style={{
										background: 'none',
										border: 'none',
										color: '#60a5fa',
										cursor: 'pointer',
										padding: '4px 0',
										fontWeight: 500,
									}}
								>
									{t('mai.resendCode') || 'Renvoyer un code'}
								</button>
							</div>
						</form>
					) : (
						/* Login / Register Form */
						<div>
							{/* Tabs Switcher */}
							<div
								style={{
									display: 'flex',
									borderRadius: 10,
									background: 'rgba(255, 255, 255, 0.05)',
									padding: 4,
									marginBottom: 24,
									border: '1px solid rgba(255, 255, 255, 0.06)',
								}}
							>
								<button
									type="button"
									onClick={() => { setActiveTab('login'); setError(null); }}
									style={{
										flex: 1,
										padding: '8px 0',
										borderRadius: 8,
										border: 'none',
										background: activeTab === 'login' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(99, 102, 241, 0.25))' : 'transparent',
										color: activeTab === 'login' ? '#fff' : 'var(--fg-muted, #a1a1aa)',
										fontWeight: activeTab === 'login' ? 700 : 500,
										fontSize: 13,
										cursor: 'pointer',
										transition: 'all 0.15s ease',
										borderBottom: activeTab === 'login' ? '1px solid rgba(59, 130, 246, 0.4)' : 'none',
									}}
								>
									{t('mai.login') || 'Connexion'}
								</button>
								<button
									type="button"
									onClick={() => { setActiveTab('register'); setError(null); }}
									style={{
										flex: 1,
										padding: '8px 0',
										borderRadius: 8,
										border: 'none',
										background: activeTab === 'register' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(99, 102, 241, 0.25))' : 'transparent',
										color: activeTab === 'register' ? '#fff' : 'var(--fg-muted, #a1a1aa)',
										fontWeight: activeTab === 'register' ? 700 : 500,
										fontSize: 13,
										cursor: 'pointer',
										transition: 'all 0.15s ease',
										borderBottom: activeTab === 'register' ? '1px solid rgba(59, 130, 246, 0.4)' : 'none',
									}}
								>
									{t('mai.register') || 'Créer un compte'}
								</button>
							</div>

							{activeTab === 'login' ? (
								<form onSubmit={handleLogin}>
									<div style={{ marginBottom: 16 }}>
										<label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#e4e4e7' }}>
											{t('mai.identifier') || 'Email ou nom d\'utilisateur'}
										</label>
										<div style={{ position: 'relative' }}>
											<span style={{ position: 'absolute', left: 12, top: 11, opacity: 0.6, display: 'inline-flex', color: 'var(--fg-muted, #a1a1aa)' }}>
												<IconMail />
											</span>
											<input
												type="text"
												value={identifier}
												onChange={(e) => setIdentifier(e.target.value)}
												placeholder="nom@exemple.com ou pseudo"
												required
												autoFocus
												style={{
													width: '100%',
													padding: '10px 14px 10px 38px',
													borderRadius: 10,
													background: 'rgba(255, 255, 255, 0.05)',
													border: '1px solid rgba(255, 255, 255, 0.14)',
													color: '#fff',
													fontSize: 13,
													outline: 'none',
													boxSizing: 'border-box',
													transition: 'border-color 0.15s ease',
												}}
											/>
										</div>
									</div>

									<div style={{ marginBottom: 24 }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
											<label style={{ fontSize: 13, fontWeight: 600, color: '#e4e4e7' }}>
												{t('mai.password') || 'Mot de passe'}
											</label>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												style={{
													background: 'none',
													border: 'none',
													color: '#60a5fa',
													fontSize: 12,
													cursor: 'pointer',
													padding: 0,
													display: 'inline-flex',
													alignItems: 'center',
													gap: 4,
												}}
											>
												{showPassword ? (
													<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
														Masquer <IconEyeOff />
													</span>
												) : (
													<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
														Afficher <IconEye />
													</span>
												)}
											</button>
										</div>
										<div style={{ position: 'relative' }}>
											<span style={{ position: 'absolute', left: 12, top: 11, opacity: 0.6, display: 'inline-flex', color: 'var(--fg-muted, #a1a1aa)' }}>
												<IconLock />
											</span>
											<input
												type={showPassword ? 'text' : 'password'}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="••••••••"
												required
												style={{
													width: '100%',
													padding: '10px 14px 10px 38px',
													borderRadius: 10,
													background: 'rgba(255, 255, 255, 0.05)',
													border: '1px solid rgba(255, 255, 255, 0.14)',
													color: '#fff',
													fontSize: 13,
													outline: 'none',
													boxSizing: 'border-box',
												}}
											/>
										</div>
									</div>

									<button
										type="submit"
										disabled={loading || !identifier.trim() || !password}
										style={{
											width: '100%',
											padding: '12px 16px',
											borderRadius: 10,
											background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
											border: 'none',
											color: '#fff',
											fontWeight: 700,
											fontSize: 14,
											cursor: loading || !identifier.trim() || !password ? 'not-allowed' : 'pointer',
											boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
											opacity: loading || !identifier.trim() || !password ? 0.6 : 1,
											transition: 'all 0.15s ease',
										}}
									>
										{loading ? 'Connexion en cours…' : (t('mai.login') || 'Se connecter')}
									</button>
								</form>
							) : (
								<form onSubmit={handleRegister}>
									<div style={{ marginBottom: 14 }}>
										<label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#e4e4e7' }}>
											{t('mai.email') || 'Adresse email'}
										</label>
										<div style={{ position: 'relative' }}>
											<span style={{ position: 'absolute', left: 12, top: 11, opacity: 0.6, display: 'inline-flex', color: 'var(--fg-muted, #a1a1aa)' }}>
												<IconMail />
											</span>
											<input
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="votre@email.com"
												required
												style={{
													width: '100%',
													padding: '10px 14px 10px 38px',
													borderRadius: 10,
													background: 'rgba(255, 255, 255, 0.05)',
													border: '1px solid rgba(255, 255, 255, 0.14)',
													color: '#fff',
													fontSize: 13,
													outline: 'none',
													boxSizing: 'border-box',
												}}
											/>
										</div>
									</div>

									<div style={{ marginBottom: 14 }}>
										<label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#e4e4e7' }}>
											{t('mai.username') || 'Nom d\'utilisateur'}
										</label>
										<div style={{ position: 'relative' }}>
											<span style={{ position: 'absolute', left: 12, top: 11, opacity: 0.6, display: 'inline-flex', color: 'var(--fg-muted, #a1a1aa)' }}>
												<IconUser />
											</span>
											<input
												type="text"
												value={username}
												onChange={(e) => setUsername(e.target.value)}
												placeholder="mon_pseudo"
												required
												style={{
													width: '100%',
													padding: '10px 14px 10px 38px',
													borderRadius: 10,
													background: 'rgba(255, 255, 255, 0.05)',
													border: '1px solid rgba(255, 255, 255, 0.14)',
													color: '#fff',
													fontSize: 13,
													outline: 'none',
													boxSizing: 'border-box',
												}}
											/>
										</div>
									</div>

									<div style={{ marginBottom: 24 }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
											<label style={{ fontSize: 13, fontWeight: 600, color: '#e4e4e7' }}>
												{t('mai.password') || 'Mot de passe'}
											</label>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												style={{
													background: 'none',
													border: 'none',
													color: '#60a5fa',
													fontSize: 12,
													cursor: 'pointer',
													padding: 0,
													display: 'inline-flex',
													alignItems: 'center',
													gap: 4,
												}}
											>
												{showPassword ? (
													<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
														Masquer <IconEyeOff />
													</span>
												) : (
													<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
														Afficher <IconEye />
													</span>
												)}
											</button>
										</div>
										<div style={{ position: 'relative' }}>
											<span style={{ position: 'absolute', left: 12, top: 11, opacity: 0.6, display: 'inline-flex', color: 'var(--fg-muted, #a1a1aa)' }}>
												<IconLock />
											</span>
											<input
												type={showPassword ? 'text' : 'password'}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Au moins 6 caractères"
												required
												minLength={6}
												style={{
													width: '100%',
													padding: '10px 14px 10px 38px',
													borderRadius: 10,
													background: 'rgba(255, 255, 255, 0.05)',
													border: '1px solid rgba(255, 255, 255, 0.14)',
													color: '#fff',
													fontSize: 13,
													outline: 'none',
													boxSizing: 'border-box',
												}}
											/>
										</div>
									</div>

									<button
										type="submit"
										disabled={loading || !email.trim() || !username.trim() || !password}
										style={{
											width: '100%',
											padding: '12px 16px',
											borderRadius: 10,
											background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
											border: 'none',
											color: '#fff',
											fontWeight: 700,
											fontSize: 14,
											cursor: loading || !email.trim() || !username.trim() || !password ? 'not-allowed' : 'pointer',
											boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
											opacity: loading || !email.trim() || !username.trim() || !password ? 0.6 : 1,
											transition: 'all 0.15s ease',
										}}
									>
										{loading ? 'Création en cours…' : (t('mai.register') || 'Créer mon compte')}
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

