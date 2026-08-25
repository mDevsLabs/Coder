/** /create-subagent 向导：引导创建 Subagent 角色说明 */

import type { AppLocale } from '../src/i18n/types.js';

export type SubagentCreatorScope = 'user' | 'project';

export function formatSubagentCreatorUserBubble(
	scope: SubagentCreatorScope,
	lang: AppLocale,
	userNote: string
): string {
	const head =
		scope === 'project'
			? lang === 'zh-CN'
				? '[创建 Subagent · 本项目]'
				: lang === 'fr'
				? '[Créer un Sous-agent · Ce projet]'
				: '[Create Subagent · This project]'
			: lang === 'zh-CN'
				? '[创建 Subagent · 所有项目]'
				: lang === 'fr'
				? '[Créer un Sous-agent · Tous les projets]'
				: '[Create Subagent · All projects]';
	const body = userNote.trim();
	return body ? `${head}\n${body}` : head;
}

export function buildSubagentCreatorSystemAppend(
	scope: SubagentCreatorScope,
	lang: AppLocale,
	workspaceRoot: string | null
): string {
	const scopeBlock =
		scope === 'project'
			? lang === 'zh-CN'
				? `**目标：本项目。** 优先把 Subagent 写入工作区 **.mai/agent.json**，或写入 mAI Coder 的项目级 Agent 设置。工作区根目录：\`${workspaceRoot ?? '（无）'}\`。`
				: lang === 'fr'
				? `**Cible : ce projet.** Privilégiez l'ajout du sous-agent dans le fichier **.mai/agent.json** du workspace ou les paramètres de projet. Racine du workspace : \`${workspaceRoot ?? '(aucun)'}\`.`
				: `**Target: this project.** Prefer adding the subagent to workspace **.mai/agent.json** or project-scoped agent settings in mAI Coder. Workspace root: \`${workspaceRoot ?? '(none)'}\`.`
			: lang === 'zh-CN'
				? '**目标：所有项目（用户级）。** 说明如何通过 mAI Coder **设置 → Agent → Subagents** 添加全局 Subagent。'
				: lang === 'fr'
				? '**Cible : tous les projets (global / utilisateur).** Décrivez comment ajouter le sous-agent via mAI Coder **Paramètres → Agent → Subagents**.'
				: '**Target: all projects (user-level).** Describe adding the subagent via mAI Coder **Settings → Agent → Subagents** for global use.';

	const toolBlock =
		lang === 'zh-CN'
			? `**执行方式：** 本轮运行在 **Agent** 模式，可使用 \`Write\` 和 \`Edit\`。
- 只要工作区已打开，就**必须**用工具把 Subagent 持久化到项目文件中，通常是合并进 \`.mai/agent.json\` 的 \`subagents\`（或 mAI Coder 实际使用的项目级 agent JSON）。**不要**只贴一段 JSON 让用户自己复制；应直接改文件，并说明写入位置。
- 如果是**用户级 / 所有项目**，但当前没有工作区，工具无法写入应用 userData。请明确说明这一点，只给出最小必要的手动添加步骤，不要声称已经写入。
- **本项目**范围必须有工作区。`
			: lang === 'fr'
			? `**Mode d'exécution :** Ce tour s'exécute en mode **Agent** avec les outils \`Write\` et \`Edit\`.
- Si un espace de travail est ouvert, vous **devez** persister le sous-agent en modifiant les fichiers projet (ex: dans \`.mai/agent.json\`). Ne donnez pas seulement du JSON à copier ; utilisez les outils.
- Si la portée est globale sans espace de travail ouvert, indiquez les étapes d'ajout manuel.`
			: `**Execution mode:** This turn runs in **Agent** with \`Write\` and \`Edit\`.
- If a workspace is open, you **must** persist the subagent by editing project files—typically merge into \`.mai/agent.json\` \`subagents\` (or the project's agent JSON mAI Coder uses). Do **not** only paste JSON for the user to copy; use tools, then confirm paths.
- User-level / all-projects scope without workspace: tools cannot write app userData; state that clearly and give minimal manual registration steps—do not claim files were written.
- Project scope requires workspace.`;

	const core =
		lang === 'zh-CN'
			? `你是 mAI Coder 的 **Subagent 创建向导**。用户说明会出现在范围标签之后。

${toolBlock}

请完成以下工作：
1. 仅在信息不足时，再澄清角色名、触发委派的时机、职责边界，以及是否需要持久记忆。
2. 如果这个 Subagent 适合保留长期上下文，请补充可选字段 \`memoryScope\`，取值只能是 \`user\` / \`project\` / \`local\`；如果不需要持久记忆，就不要写这个字段。
3. 只要工作区已打开，就用工具把 Subagent 规格（名称、一行描述、详细 instructions、可选 \`memoryScope\`）**写入**正确的 JSON / 配置文件。
4. 最后用简短文字说明：它会在 mAI Coder 中以什么范围生效。

${scopeBlock}`
			: lang === 'fr'
			? `Vous êtes l'assistant de **création de Sous-agent** pour mAI Coder. Les notes de l'utilisateur figurent après la balise de portée.

${toolBlock}

Votre mission :
1. Clarifiez le rôle, les déclencheurs de délégation, les limites et la mémoire persistante si nécessaire.
2. Si la mémoire persistante est utile, choisissez le \`memoryScope\` (\`user\` / \`project\` / \`local\`).
3. Lorsque l'espace de travail est ouvert, **appliquez** la spécification du sous-agent (nom, description, instructions, memoryScope) dans les fichiers appropriés avec les outils.
4. Concluez par une courte explication sur la portée d'effet dans mAI Coder.

${scopeBlock}`
			: `You are mAI Coder's **Subagent Creator**. The user's notes appear after the scope tag.

${toolBlock}

Your job:
1. Clarify role name, delegation triggers, boundaries, and whether it should keep persistent memory only if missing.
2. If persistent memory would help, choose optional \`memoryScope\` from \`user\` / \`project\` / \`local\`; otherwise omit it.
3. When workspace is open, **apply** the subagent spec (name, one-line description, detailed instructions, optional \`memoryScope\`) into the correct JSON/files via tools.
4. End with a short note on how it takes effect in mAI Coder for the chosen scope.

${scopeBlock}`;

	return `### mAI Coder · Subagent Creator（内置）\n\n${core}`;
}
