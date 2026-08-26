import { memo } from 'react';
import '../styles/editor-layout.css';
import { BrandLogo } from '../BrandLogo';
import { IconExplorer, IconCloudOutline, IconServerOutline } from '../icons';
import type { TFunction } from '../i18n';

function workspacePathDisplayName(full: string): string {
	const norm = full.replace(/\\/g, '/');
	const parts = norm.split('/').filter(Boolean);
	return parts[parts.length - 1] ?? full;
}

function workspacePathParent(full: string): string {
	const norm = full.replace(/\\/g, '/');
	const i = norm.lastIndexOf('/');
	if (i <= 0) {
		return '';
	}
	return norm.slice(0, i);
}

export type AppWorkspaceWelcomeProps = {
	t: TFunction;
	homeRecents: string[];
	onOpenWorkspacePicker: () => void;
	onOpenWorkspacePath: (path: string) => void;
	maiAccount?: import('../ipcTypes').MaiAccountState;
	onOpenMaiAccount?: () => void;
};

/** 未打开工作区时的欢迎页（Agent / Editor 共用），独立 memo 避免主壳其它状态更新时整页 reconcile */
export const AppWorkspaceWelcome = memo(function AppWorkspaceWelcome({
	t,
	homeRecents,
	onOpenWorkspacePicker,
	onOpenWorkspacePath,
	maiAccount,
	onOpenMaiAccount,
}: AppWorkspaceWelcomeProps) {
	const isLoggedIn = Boolean(maiAccount?.jwtToken);
	const user = maiAccount?.user;
	const usage = maiAccount?.usage;
	const tokensUsed = usage?.tokensUsed ?? 0;
	const limit = usage?.limit ?? 5_000_000;
	const usagePercent = Math.min(100, Math.round((tokensUsed / (limit || 1)) * 100));
	const formattedTokens = new Intl.NumberFormat('fr-FR').format(tokensUsed);
	const formattedLimit = new Intl.NumberFormat('fr-FR').format(limit);

	const resetDateStr = usage?.resetAt
		? new Date(usage.resetAt).toLocaleDateString('fr-FR', {
				day: 'numeric',
				month: 'short',
				hour: '2-digit',
				minute: '2-digit',
		  })
		: undefined;

	return (
		<div className="ref-body ref-body--editor-home" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
			<main className="ref-editor-welcome" aria-label={t('app.editorWelcomeAria')}>
				<div className="ref-editor-welcome-inner">
					{/* Account & Usage Foreground Card */}
					{onOpenMaiAccount ? (
						<section
							className="ref-welcome-account-banner"
							onClick={onOpenMaiAccount}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									onOpenMaiAccount();
								}
							}}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 16,
								padding: '14px 20px',
								borderRadius: 14,
								background: isLoggedIn
									? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)'
									: 'rgba(255, 255, 255, 0.03)',
								border: isLoggedIn
									? '1px solid rgba(99, 102, 241, 0.3)'
									: '1px solid rgba(255, 255, 255, 0.08)',
								cursor: 'pointer',
								boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
								transition: 'all 0.2s ease',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0, flex: 1 }}>
								{isLoggedIn ? (
									user?.avatarUrl ? (
										<img
											src={user.avatarUrl}
											alt={user.username || 'Avatar'}
											style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
										/>
									) : (
										<div
											style={{
												width: 40,
												height: 40,
												borderRadius: '50%',
												background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontWeight: 700,
												fontSize: 16,
												color: '#fff',
												flexShrink: 0,
												boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
											}}
										>
											{(user?.username || 'M').charAt(0).toUpperCase()}
										</div>
									)
								) : (
									<div
										style={{
											width: 40,
											height: 40,
											borderRadius: '50%',
											background: 'rgba(255, 255, 255, 0.08)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontWeight: 700,
											fontSize: 16,
											color: 'var(--fg-muted, #a1a1aa)',
											flexShrink: 0,
										}}
									>
										👤
									</div>
								)}

								<div style={{ minWidth: 0, flex: 1 }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
										<span style={{ fontWeight: 600, fontSize: 14, color: 'var(--void-fg-0, #fff)' }}>
											{isLoggedIn ? (user?.username || 'Utilisateur mAI') : 'Compte mAI Coder'}
										</span>
										{isLoggedIn && user?.tier ? (
											<span
												style={{
													fontSize: 10,
													fontWeight: 700,
													textTransform: 'uppercase',
													padding: '2px 8px',
													borderRadius: 999,
													background: user.tier === 'Pro' || user.tier === 'Max' ? '#3b82f6' : 'rgba(255,255,255,0.12)',
													color: '#fff',
													letterSpacing: '0.04em',
												}}
											>
												{user.tier}
											</span>
										) : null}
										{!isLoggedIn ? (
											<span style={{ fontSize: 12, color: 'var(--fg-muted, #a1a1aa)' }}>
												(Non connecté)
											</span>
										) : null}
									</div>

									{isLoggedIn && usage ? (
										<div style={{ marginTop: 6, maxWidth: 440 }}>
											<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, marginBottom: 4, gap: 8 }}>
												<span style={{ color: 'var(--fg-muted, #a1a1aa)' }}>
													{formattedTokens} / {formattedLimit} tokens
												</span>
												<span
													style={{
														fontWeight: 600,
														color: usagePercent > 85 ? '#ef4444' : usagePercent > 70 ? '#f59e0b' : '#60a5fa',
													}}
												>
													{usagePercent}% utilisé
												</span>
											</div>
											<div style={{ height: 5, borderRadius: 3, background: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
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
														borderRadius: 3,
														transition: 'width 0.3s ease',
													}}
												/>
											</div>
										</div>
									) : (
										<div style={{ fontSize: 12, color: 'var(--fg-muted, #a1a1aa)', marginTop: 2 }}>
											{isLoggedIn ? 'Consultez votre consommation et gérez votre forfait' : 'Connectez-vous pour débloquer les modèles et suivre votre consommation'}
										</div>
									)}
								</div>
							</div>

							<div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
								{resetDateStr && isLoggedIn ? (
									<span style={{ fontSize: 11, color: 'var(--fg-muted, #a1a1aa)', display: 'none' }}>
										Reset: {resetDateStr}
									</span>
								) : null}
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										onOpenMaiAccount();
									}}
									style={{
										padding: '7px 14px',
										borderRadius: 8,
										background: isLoggedIn ? 'rgba(255, 255, 255, 0.08)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
										border: isLoggedIn ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
										color: '#fff',
										fontSize: 12,
										fontWeight: 600,
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										gap: 6,
									}}
								>
									{isLoggedIn ? 'Détails de l\'usage 📊' : 'Se connecter ✨'}
								</button>
							</div>
						</section>
					) : null}

					<section className="ref-editor-launchpad">
						<div className="ref-editor-welcome-brand">
							<BrandLogo className="ref-editor-welcome-logo" size={44} />
							<div className="ref-editor-welcome-brand-text">
								<span className="ref-editor-welcome-wordmark">mAI Coder</span>
								<span className="ref-editor-welcome-tagline">{t('app.editorWelcomeTagline')}</span>
							</div>
						</div>
						<div
							className="ref-editor-welcome-actions"
							role="group"
							aria-label={t('app.editorWelcomeActionsAria')}
						>
							<button type="button" className="ref-welcome-action-card ref-welcome-action-card--primary" onClick={onOpenWorkspacePicker}>
								<span className="ref-welcome-action-icon" aria-hidden>
									<IconExplorer />
								</span>
								<span className="ref-welcome-action-copy">
									<span className="ref-welcome-action-label">{t('app.welcomeOpenProject')}</span>
									<span className="ref-welcome-action-subtitle">{t('app.welcomeOpenProjectHint')}</span>
								</span>
							</button>
							<button type="button" className="ref-welcome-action-card ref-welcome-action-card--soon" disabled title={t('app.comingSoon')}>
								<span className="ref-welcome-action-icon" aria-hidden>
									<IconCloudOutline />
								</span>
								<span className="ref-welcome-action-copy">
									<span className="ref-welcome-action-label">{t('app.welcomeCloneRepo')}</span>
									<span className="ref-welcome-action-subtitle">{t('app.welcomeCloneRepoHint')}</span>
								</span>
							</button>
							<button type="button" className="ref-welcome-action-card ref-welcome-action-card--soon" disabled title={t('app.comingSoon')}>
								<span className="ref-welcome-action-icon" aria-hidden>
									<IconServerOutline />
								</span>
								<span className="ref-welcome-action-copy">
									<span className="ref-welcome-action-label">{t('app.welcomeConnectSsh')}</span>
									<span className="ref-welcome-action-subtitle">{t('app.welcomeConnectSshHint')}</span>
								</span>
							</button>
						</div>
					</section>
					<section
						className="ref-editor-welcome-recents ref-editor-welcome-panel"
						aria-labelledby="ref-welcome-recents-title"
					>
						<div className="ref-editor-welcome-recents-head">
							<h2 id="ref-welcome-recents-title" className="ref-editor-welcome-recents-title">
								{t('app.recentProjects')}
							</h2>
							<button type="button" className="ref-welcome-view-all" onClick={onOpenWorkspacePicker}>
								{t('app.viewAllRecents', { count: String(homeRecents.length) })}
							</button>
						</div>
						{homeRecents.length === 0 ? (
							<p className="ref-editor-welcome-recents-empty muted">{t('app.noRecentsYet')}</p>
						) : (
							<div className="ref-editor-welcome-recents-list" role="list">
								{homeRecents.slice(0, 6).map((p) => (
									<button
										key={p}
										type="button"
										className="ref-welcome-recent-card"
										role="listitem"
										title={p}
										onClick={() => void onOpenWorkspacePath(p)}
									>
										<span className="ref-welcome-recent-card-icon" aria-hidden>
											<IconExplorer />
										</span>
										<span className="ref-welcome-recent-card-copy">
											<span className="ref-welcome-recent-card-name">{workspacePathDisplayName(p)}</span>
											<span className="ref-welcome-recent-card-path muted">{workspacePathParent(p) || '—'}</span>
										</span>
									</button>
								))}
							</div>
						)}
					</section>
				</div>
			</main>
		</div>
	);
});
