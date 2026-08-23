import { memo, type ReactNode, type RefObject } from 'react';
import type { TFunction } from './i18n';
import type { ThreadInfo } from './threadTypes';
import {
	IconChevron,
	IconDotsHorizontal,
	IconExplorer,
	IconPlus,
	IconPlugin,
	IconSearch,
	IconSettings,
	IconSparkles,
	IconTerminal,
	IconNewItem,
} from './icons';

export type AgentSidebarWorkspace = {
	path: string;
	name: string;
	parent: string;
	isCurrent: boolean;
	isCollapsed: boolean;
	threadCount: number;
	todayThreads: ThreadInfo[];
	archivedThreads: ThreadInfo[];
};

export type AgentLeftSidebarProps = {
	t: TFunction;
	agentSidebarWorkspaces: AgentSidebarWorkspace[];
	renderThreadItem: (thread: ThreadInfo, threadListWorkspace: string) => ReactNode;
	editingWorkspacePath: string | null;
	editingWorkspaceNameDraft: string;
	workspaceNameInputRef: RefObject<HTMLInputElement | null>;
	onWorkspaceNameDraftChange: (value: string) => void;
	commitWorkspaceAliasEdit: () => void;
	cancelWorkspaceAliasEdit: () => void;
	handleWorkspacePrimaryAction: (path: string) => void;
	workspaceMenuPath: string | null;
	closeWorkspaceMenu: () => void;
	openWorkspaceMenu: (path: string, anchor: HTMLButtonElement) => void;
	onNewThread: () => void;
	onNewThreadForWorkspace: (path: string) => void;
	openWorkspacePicker: () => void;
	openQuickOpen: () => void;
	openPluginSettings: () => void;
	openGeneralSettings: () => void;
	openSkillsSettings?: () => void;
	openUniversalTerminal?: () => void;
	maiAccount?: import('./ipcTypes').MaiAccountState;
	onOpenMaiAccount?: () => void;
};

export const AgentLeftSidebar = memo(function AgentLeftSidebar({
	t,
	agentSidebarWorkspaces,
	renderThreadItem,
	editingWorkspacePath,
	editingWorkspaceNameDraft,
	workspaceNameInputRef,
	onWorkspaceNameDraftChange,
	commitWorkspaceAliasEdit,
	cancelWorkspaceAliasEdit,
	handleWorkspacePrimaryAction,
	workspaceMenuPath,
	closeWorkspaceMenu,
	openWorkspaceMenu,
	onNewThread,
	onNewThreadForWorkspace,
	openWorkspacePicker,
	openQuickOpen,
	openPluginSettings,
	openGeneralSettings,
	openSkillsSettings,
	openUniversalTerminal,
	maiAccount,
	onOpenMaiAccount,
}: AgentLeftSidebarProps) {
	return (
		<div className="ref-left-agent-nest">
			<div className="ref-left-scroll">
				<div className="ref-project-block ref-project-block--agent">
					<nav className="ref-agent-nav-list" aria-label={t('app.projectAndAgent')}>
						<button type="button" className="ref-agent-nav-item" onClick={onNewThread}>
							<IconPlus className="ref-agent-nav-item-icon" />
							<span>{t('app.newAgent')}</span>
						</button>
						<button type="button" className="ref-agent-nav-item" onClick={openQuickOpen}>
							<IconSearch className="ref-agent-nav-item-icon" />
							<span>{t('common.search')}</span>
						</button>
						{openSkillsSettings ? (
							<button type="button" className="ref-agent-nav-item" onClick={openSkillsSettings}>
								<IconSparkles className="ref-agent-nav-item-icon" />
								<span>{t('app.skills')}</span>
							</button>
						) : null}
						<button type="button" className="ref-agent-nav-item" onClick={openPluginSettings}>
							<IconPlugin className="ref-agent-nav-item-icon" />
							<span>{t('settings.nav.plugins')}</span>
						</button>
						{openUniversalTerminal ? (
							<button type="button" className="ref-agent-nav-item" onClick={openUniversalTerminal}>
								<IconTerminal className="ref-agent-nav-item-icon" />
								<span>{t('app.universalTerminal')}</span>
							</button>
						) : null}
					</nav>

					<div className="ref-agent-sidebar-section">
						<div className="ref-agent-sidebar-section-head">
							<span className="ref-agent-sidebar-section-title">{t('app.sidebarProjects')}</span>
							<div className="ref-agent-sidebar-section-actions">
								<button
									type="button"
									className="ref-agent-sidebar-icon-btn"
									title={t('app.openWorkspace')}
									aria-label={t('app.openWorkspace')}
									onClick={openWorkspacePicker}
								>
									<IconExplorer />
								</button>
								<button
									type="button"
									className="ref-agent-sidebar-icon-btn"
									title={t('common.search')}
									aria-label={t('common.search')}
									onClick={openQuickOpen}
								>
									<IconSearch />
								</button>
								<button
									type="button"
									className="ref-agent-sidebar-icon-btn"
									title={t('app.newAgent')}
									aria-label={t('app.newAgent')}
									onClick={onNewThread}
								>
									<IconNewItem />
								</button>
							</div>
						</div>

						<div className="ref-agent-workspace-stack">
							{agentSidebarWorkspaces.length === 0 ? (
								<div className="ref-agent-empty-workspace" role="status">
									<span className="ref-agent-empty-workspace-icon" aria-hidden>
										<IconExplorer />
									</span>
									<div className="ref-agent-empty-workspace-copy">
										<span className="ref-agent-empty-workspace-title">{t('app.openWorkspace')}</span>
										<p className="ref-agent-empty-workspace-body">{t('app.explorerPlaceholder')}</p>
									</div>
									<button
										type="button"
										className="ref-agent-empty-workspace-btn"
										onClick={openWorkspacePicker}
									>
										<IconExplorer />
										<span>{t('app.openWorkspace')}</span>
									</button>
								</div>
							) : (
								agentSidebarWorkspaces.map((ws) => {
									const allThreads = [...ws.todayThreads, ...ws.archivedThreads];
									const hasThreads = allThreads.length > 0;
									const showThreads = !ws.isCollapsed;
									const isEditingWorkspace = editingWorkspacePath === ws.path;
									return (
										<div
											key={ws.path}
											className={`ref-agent-workspace-group ${ws.isCurrent ? 'is-active' : ''} ${
												ws.isCollapsed ? 'is-collapsed' : ''
											} ${workspaceMenuPath === ws.path ? 'is-menu-open' : ''}`}
										>
											<div className={`ref-agent-workspace-row-shell ${ws.isCurrent ? 'is-active' : ''}`}>
												{isEditingWorkspace ? (
													<div className={`ref-agent-workspace-row is-editing ${ws.isCurrent ? 'is-active' : ''}`}>
														<span
															className={`ref-agent-workspace-disclosure ${
																showThreads ? 'is-open' : ''
															} is-visible`}
															aria-hidden
														>
															<IconChevron className="ref-agent-workspace-disclosure-icon" />
														</span>
														<span className="ref-agent-workspace-row-icon" aria-hidden>
															<IconExplorer />
														</span>
														<span className="ref-agent-workspace-row-copy">
															<input
																ref={workspaceNameInputRef}
																type="text"
																className="ref-agent-workspace-title-input"
																value={editingWorkspaceNameDraft}
																aria-label={t('app.workspaceMenuEditNamePrompt')}
																onChange={(e) => onWorkspaceNameDraftChange(e.target.value)}
																onClick={(e) => e.stopPropagation()}
																onKeyDown={(e) => {
																	if (e.key === 'Enter') {
																		e.preventDefault();
																		commitWorkspaceAliasEdit();
																	} else if (e.key === 'Escape') {
																		e.preventDefault();
																		cancelWorkspaceAliasEdit();
																	}
																}}
																onBlur={commitWorkspaceAliasEdit}
															/>
														</span>
														{ws.threadCount > 0 ? (
															<span className="ref-agent-workspace-row-badge">{ws.threadCount}</span>
														) : null}
													</div>
												) : (
													<button
														type="button"
														className={`ref-agent-workspace-row ${ws.isCurrent ? 'is-active' : ''}`}
														onClick={() => handleWorkspacePrimaryAction(ws.path)}
														aria-expanded={!ws.isCollapsed}
													>
														<span
															className={`ref-agent-workspace-disclosure ${
																showThreads ? 'is-open' : ''
															} is-visible`}
															aria-hidden
														>
															<IconChevron className="ref-agent-workspace-disclosure-icon" />
														</span>
														<span className="ref-agent-workspace-row-icon" aria-hidden>
															<IconExplorer />
														</span>
														<span className="ref-agent-workspace-row-copy">
															<span className="ref-agent-workspace-row-label" title={ws.path}>
																{ws.name}
															</span>
														</span>
														{ws.threadCount > 0 ? (
															<span className="ref-agent-workspace-row-badge">{ws.threadCount}</span>
														) : null}
													</button>
												)}

												<div className="ref-agent-workspace-actions">
													<button
														type="button"
														className="ref-agent-workspace-action-btn"
														title={t('app.newAgent')}
														aria-label={t('app.newAgent')}
														onClick={(e) => {
															e.stopPropagation();
															onNewThreadForWorkspace(ws.path);
														}}
													>
														<IconPlus />
													</button>
													<button
														type="button"
														className={`ref-agent-workspace-action-btn ${
															workspaceMenuPath === ws.path ? 'is-active' : ''
														}`}
														title={t('app.editorChatMoreAria')}
														aria-label={t('app.editorChatMoreAria')}
														aria-haspopup="menu"
														aria-expanded={workspaceMenuPath === ws.path}
														onClick={(e) => {
															e.stopPropagation();
															const anchor = e.currentTarget;
															if (workspaceMenuPath === ws.path) {
																closeWorkspaceMenu();
															} else {
																openWorkspaceMenu(ws.path, anchor);
															}
														}}
													>
														<IconDotsHorizontal />
													</button>
												</div>
											</div>

											<div className={`ref-collapse-grid ${showThreads ? 'is-open' : ''}`}>
												<div className="ref-collapse-inner">
													{hasThreads ? (
														<div className="ref-agent-thread-list" aria-hidden={!showThreads}>
															{allThreads.map((th) => renderThreadItem(th, ws.path))}
														</div>
													) : (
														<div className="ref-agent-workspace-empty" aria-hidden={!showThreads}>
															{t('app.noThreads')}
														</div>
													)}
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="ref-left-footer ref-left-footer--agent" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
				{onOpenMaiAccount ? (
					<button
						type="button"
						className="ref-agent-settings-link"
						onClick={onOpenMaiAccount}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							padding: '6px 8px',
							borderRadius: 8,
							background: maiAccount?.jwtToken ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
							border: maiAccount?.jwtToken ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
							cursor: 'pointer',
							textAlign: 'left',
							width: '100%',
						}}
					>
						{maiAccount?.user?.avatarUrl ? (
							<img
								src={maiAccount.user.avatarUrl}
								alt="Avatar"
								style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }}
							/>
						) : (
							<div
								style={{
									width: 22,
									height: 22,
									borderRadius: '50%',
									background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 11,
									fontWeight: 700,
									color: '#fff',
									flexShrink: 0,
								}}
							>
								{maiAccount?.user?.username ? maiAccount.user.username.charAt(0).toUpperCase() : 'm'}
							</div>
						)}
						<div style={{ flex: 1, minWidth: 0 }}>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								<span style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
									{maiAccount?.user?.username || t('mai.account')}
								</span>
								{maiAccount?.user?.tier ? (
									<span
										style={{
											fontSize: 10,
											fontWeight: 700,
											textTransform: 'uppercase',
											padding: '1px 5px',
											borderRadius: 4,
											background: 'rgba(59, 130, 246, 0.2)',
											color: '#60a5fa',
										}}
									>
										{maiAccount.user.tier}
									</span>
								) : null}
							</div>
							{maiAccount?.usage ? (
								<div style={{ marginTop: 3 }}>
									<div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
										<div
											style={{
												height: '100%',
												width: `${Math.min(100, Math.round((maiAccount.usage.tokensUsed / (maiAccount.usage.limit || 1)) * 100))}%`,
												background: '#3b82f6',
												borderRadius: 2,
											}}
										/>
									</div>
								</div>
							) : null}
						</div>
					</button>
				) : null}
				<button type="button" className="ref-agent-settings-link" onClick={openGeneralSettings}>
					<IconSettings className="ref-agent-settings-link-icon" />
					<span>{t('app.settings')}</span>
				</button>
			</div>
		</div>
	);
});
