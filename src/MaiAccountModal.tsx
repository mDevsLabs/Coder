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
	const usageFillModifier =
		usagePercent > 90 ? ' ref-mai-progress-fill--danger' : usagePercent > 70 ? ' ref-mai-progress-fill--warn' : '';

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
		<div className="ref-mai-backdrop" onClick={onClose}>
			<div
				className="ref-mai-card"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label={isLoggedIn ? 'Compte mAI Coder' : 'Authentification mAI Coder'}
			>
				{/* Modal Header */}
				<div className="ref-mai-head">
					<div className="ref-mai-head-brand">
						<BrandLogo size={32} aria-label="mAI Coder" />
						<div>
							<div className="ref-mai-head-title">
								{isLoggedIn ? 'Compte mAI Coder' : 'Authentification mAI Coder'}
							</div>
							<div className="ref-mai-head-sub">
								{isLoggedIn ? 'Gérez vos crédits et votre abonnement' : 'Connectez-vous pour débloquer la puissance des agents'}
							</div>
						</div>
					</div>
					<button
						type="button"
						className="ref-mai-close"
						onClick={onClose}
						title={t('common.close') || 'Fermer'}
						aria-label={t('common.close') || 'Fermer'}
					>
						<IconCloseSmall />
					</button>
				</div>

				{/* Modal Body */}
				<div className="ref-mai-body">
					{error ? (
						<div className="ref-mai-alert ref-mai-alert--error" role="alert">
							<span className="ref-mai-alert-icon" aria-hidden>
								<IconAlertTriangle />
							</span>
							<span>{error}</span>
						</div>
					) : null}

					{successMsg ? (
						<div className="ref-mai-alert ref-mai-alert--success" role="status">
							<span className="ref-mai-alert-icon" aria-hidden>
								<IconCheckCircle />
							</span>
							<span>{successMsg}</span>
						</div>
					) : null}

					{isLoggedIn ? (
						/* Profile View */
						<div>
							{/* User Profile Card */}
							<div className="ref-mai-profile">
								{user?.avatarUrl ? (
									<img
										className="ref-mai-avatar"
										src={user.avatarUrl}
										alt={user.username || 'Avatar'}
									/>
								) : (
									<div className="ref-mai-avatar-fallback" aria-hidden>
										{(user?.username || user?.email || 'M').charAt(0).toUpperCase()}
									</div>
								)}

								<div className="ref-mai-profile-meta">
									<div className="ref-mai-username">
										<span className="ref-mai-username-name">
											{user?.username || 'Utilisateur mAI'}
										</span>
										<span className="ref-mai-tier">
											{user?.tier || 'Free'}
										</span>
									</div>
									<div className="ref-mai-email">
										{user?.email || 'compte@mai.val.run'}
									</div>
								</div>
							</div>

							{/* Detailed Usage progress card */}
							<div className="ref-mai-usage">
								<div className="ref-mai-usage-head">
									<div>
										<div className="ref-mai-usage-title">{t('mai.usage') || 'Consommation de tokens'}</div>
										<div className="ref-mai-usage-sub">
											{formattedRemaining} tokens restants
										</div>
									</div>
									<div className="ref-mai-usage-badge">
										{usagePercent}%
									</div>
								</div>

								{/* Progress Bar */}
								<div className="ref-mai-progress">
									<div
										className={`ref-mai-progress-fill${usageFillModifier}`}
										style={{ width: `${usagePercent}%` }}
									/>
								</div>

								<div className="ref-mai-usage-foot">
									<span><strong>{formattedTokens}</strong> / {formattedLimit} tokens</span>
									{resetDateStr ? (
										<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
											<IconCalendar /> Reset : {resetDateStr}
										</span>
									) : null}
								</div>
							</div>

							{/* Actions */}
							<div className="ref-mai-btn-row">
								<button
									type="button"
									className="ref-mai-ghost"
									onClick={handleRefreshUsage}
									disabled={loading}
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
									className="ref-mai-danger"
									onClick={handleLogout}
								>
									<IconLogOut /> {t('mai.logout') || 'Se déconnecter'}
								</button>
							</div>
						</div>
					) : step === 'otp' ? (
						/* OTP Verification Screen */
						<form onSubmit={handleVerifyOtp}>
							<div className="ref-mai-otp-hero">
								<div className="ref-mai-otp-icon" aria-hidden>
									<IconMail />
								</div>
								<h3 className="ref-mai-otp-title">
									Vérification par email
								</h3>
								<p className="ref-mai-otp-text">
									Saisissez le code à 6 chiffres envoyé à<br />
									<strong>{email}</strong>
								</p>
							</div>

							<div className="ref-mai-field" style={{ marginBottom: 0 }}>
								<input
									className="ref-mai-otp-input"
									type="text"
									value={otpCode}
									onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
									placeholder="••••••"
									maxLength={8}
									required
									autoFocus
								/>
							</div>

							<button
								type="submit"
								className="ref-mai-btn ref-mai-btn--primary"
								disabled={loading || !otpCode.trim()}
								style={{ marginTop: 20, marginBottom: 16 }}
							>
								{loading ? 'Vérification en cours…' : (t('mai.verify') || 'Valider le code')}
							</button>

							<div className="ref-mai-otp-actions">
								<button
									type="button"
									className="ref-mai-text-btn"
									onClick={() => setStep('form')}
								>
									← {t('common.back') || 'Retour'}
								</button>
								<button
									type="button"
									className="ref-mai-text-btn ref-mai-text-btn--accent"
									onClick={handleResendOtp}
									disabled={loading}
								>
									{t('mai.resendCode') || 'Renvoyer un code'}
								</button>
							</div>
						</form>
					) : (
						/* Login / Register Form */
						<div>
							{/* Tabs Switcher */}
							<div className="ref-mai-tabs" role="tablist">
								<button
									type="button"
									role="tab"
									aria-selected={activeTab === 'login'}
									className={`ref-mai-tab${activeTab === 'login' ? ' is-active' : ''}`}
									onClick={() => { setActiveTab('login'); setError(null); }}
								>
									{t('mai.login') || 'Connexion'}
								</button>
								<button
									type="button"
									role="tab"
									aria-selected={activeTab === 'register'}
									className={`ref-mai-tab${activeTab === 'register' ? ' is-active' : ''}`}
									onClick={() => { setActiveTab('register'); setError(null); }}
								>
									{t('mai.register') || 'Créer un compte'}
								</button>
							</div>

							{activeTab === 'login' ? (
								<form onSubmit={handleLogin}>
									<div className="ref-mai-field">
										<label className="ref-mai-label">
											{t('mai.identifier') || 'Email ou nom d\'utilisateur'}
										</label>
										<div className="ref-mai-input-wrap">
											<span className="ref-mai-input-icon" aria-hidden>
												<IconMail />
											</span>
											<input
												className="ref-mai-input"
												type="text"
												value={identifier}
												onChange={(e) => setIdentifier(e.target.value)}
												placeholder="nom@exemple.com ou pseudo"
												required
												autoFocus
											/>
										</div>
									</div>

									<div className="ref-mai-field">
										<div className="ref-mai-label-row">
											<label className="ref-mai-label" style={{ marginBottom: 0 }}>
												{t('mai.password') || 'Mot de passe'}
											</label>
											<button
												type="button"
												className="ref-mai-link"
												onClick={() => setShowPassword(!showPassword)}
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
										<div className="ref-mai-input-wrap">
											<span className="ref-mai-input-icon" aria-hidden>
												<IconLock />
											</span>
											<input
												className="ref-mai-input"
												type={showPassword ? 'text' : 'password'}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="••••••••"
												required
											/>
										</div>
									</div>

									<button
										type="submit"
										className="ref-mai-btn ref-mai-btn--primary"
										disabled={loading || !identifier.trim() || !password}
									>
										{loading ? 'Connexion en cours…' : (t('mai.login') || 'Se connecter')}
									</button>
								</form>
							) : (
								<form onSubmit={handleRegister}>
									<div className="ref-mai-field">
										<label className="ref-mai-label">
											{t('mai.email') || 'Adresse email'}
										</label>
										<div className="ref-mai-input-wrap">
											<span className="ref-mai-input-icon" aria-hidden>
												<IconMail />
											</span>
											<input
												className="ref-mai-input"
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="votre@email.com"
												required
											/>
										</div>
									</div>

									<div className="ref-mai-field">
										<label className="ref-mai-label">
											{t('mai.username') || 'Nom d\'utilisateur'}
										</label>
										<div className="ref-mai-input-wrap">
											<span className="ref-mai-input-icon" aria-hidden>
												<IconUser />
											</span>
											<input
												className="ref-mai-input"
												type="text"
												value={username}
												onChange={(e) => setUsername(e.target.value)}
												placeholder="mon_pseudo"
												required
											/>
										</div>
									</div>

									<div className="ref-mai-field">
										<div className="ref-mai-label-row">
											<label className="ref-mai-label" style={{ marginBottom: 0 }}>
												{t('mai.password') || 'Mot de passe'}
											</label>
											<button
												type="button"
												className="ref-mai-link"
												onClick={() => setShowPassword(!showPassword)}
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
										<div className="ref-mai-input-wrap">
											<span className="ref-mai-input-icon" aria-hidden>
												<IconLock />
											</span>
											<input
												className="ref-mai-input"
												type={showPassword ? 'text' : 'password'}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Au moins 6 caractères"
												required
												minLength={6}
											/>
										</div>
									</div>

									<button
										type="submit"
										className="ref-mai-btn ref-mai-btn--primary"
										disabled={loading || !email.trim() || !username.trim() || !password}
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
