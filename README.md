# mAI Coder

<p align="center">
  <img src="docs/assets/async-logo-desktop.svg" width="120" height="120" alt="mAI Coder Logo" />
</p>

<p align="center">
  <strong>Un espace de travail desktop agent-first — Agent, Éditeur, Git, Terminal, tout en un.</strong><br/>
  Maîtrisez votre workflow IA : local-first, BYOK, et entièrement personnalisable.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Agent%20First-Open%20Source-818cf8?style=flat-square" alt="Agent First & Open Source" />
  <img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Electron-41-47848F?style=flat-square&logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Monaco-0.52-0078D4?style=flat-square" alt="Monaco Editor" />
</p>

---

## Qu'est-ce que mAI Coder ?

mAI Coder est un **shell desktop IA natif** construit de zéro avec Electron + React + Monaco. Ce n'est pas un fork de VS Code — la codebase est volontairement légère, entièrement transparente et personnalisable.

L'idée centrale est simple : **l'agent est au centre**, pas un simple panneau de chat greffé à un éditeur. Tout — accès à l'espace de travail, exécution d'outils, revue de diffs, opérations terminal — s'articule autour d'une boucle transparente **Réfléchir → Planifier → Exécuter → Observer** que vous pouvez voir, orienter et interrompre à tout moment.

- **Apache 2.0** • **BYOK** pour les modèles • **Local-first** par défaut
- **Interface 100% en français**

---

## Points forts

- **Boucle agent-first** — Exécution multi-tours autonome avec cartes de paramètres en streaming (`Read`, `Write`, `Edit`, `Glob`, `Grep`, Shell, etc.) et garde-fous pour les opérations sensibles.
- **Quatre modes Composer** — **Agent** (auto complet), **Plan** (revue puis exécution), **Ask** (Q&A lecture seule) et **Debug** (dépannage systématique).
- **Mode Équipe** — Collaboration multi-agents avec planification Lead, exécution spécialiste, vérification reviewer et workflows d'approbation de plan.
- **Multi-modèles, multi-providers** — Anthropic, OpenAI, Gemini, plus tout endpoint compatible OpenAI (Ollama, vLLM, auto-hébergé). Sélection auto incluse.
- **Git natif** — Statut, diff, staging, commit et push intégrés à l'UI.
- **Pont bots IM** — Connectez **Telegram**, **Slack**, **Discord** et **Feishu (Lark)** avec le même toolchain Agent/Team.
- **Outils intégrés** — Automatisation navigateur, intelligence LSP, support MCP, index de fichiers & symboles, terminal tout-en-un partagé entre utilisateur et agent.
- **Local et privé** — Threads, paramètres et plans vivent sur votre machine. Aucun verrouillage cloud.

---

## Captures d'écran

### Disposition Agent
<p align="center">
  <img src="docs/assets/workspace_1.png" width="3062" alt="mAI Coder Agent Layout" />
</p>

### Paramètres Modèles
<p align="center">
  <img src="docs/assets/setting_1.png" width="1824" alt="mAI Coder Model Settings" />
</p>

### Palette Apparence
<p align="center">
  <img src="docs/assets/setting_2.png" width="1829" alt="mAI Coder Appearance" />
</p>

#### Thème Mac Codex
<p align="center">
  <img src="docs/assets/setting_3.png" width="1829" alt="mAI Coder Mac Codex Theme" />
</p>

### Outil Navigateur
<p align="center">
  <img src="docs/assets/browser_1.png" width="2868" alt="mAI Coder Browser Tool" />
</p>

### Groupe d'experts multi-agents
<p align="center">
  <img src="docs/assets/multi_agent_1.png" width="2871" alt="mAI Coder Multi-Agent" />
</p>

### Contrôle via bots externes
<p align="center">
  <img src="docs/assets/bot_1.png" width="2871" alt="mAI Coder Bot Integration" />
</p>

### Terminal tout-en-un
<p align="center">
  <img src="docs/assets/terminal_1.png" width="2859" alt="mAI Coder Terminal" />
</p>

---

## Fonctionnalités principales

### Boucle Agent autonome
- Paramètres d'outils en streaming avec cartes de trajectoire.
- Modes Plan et Agent : révisez le plan d'abord, ou laissez l'agent s'exécuter directement.
- Portes d'approbation pour commandes shell et écritures fichiers.
- Synchro contexte éditeur pour cibler fichier et plage de lignes.

### Support multi-modèles
- Adaptateurs intégrés Anthropic, OpenAI et Gemini.
- Support endpoints compatibles OpenAI (Ollama, vLLM, agrégateurs).
- Blocs de réflexion en streaming sur modèles compatibles.

### Expérience développeur
- Éditeur Monaco multi-onglets, coloration syntaxique et revue de diffs.
- Intégration Git : statut, diff, staging, commit, push depuis l'UI.
- Terminal xterm.js partagé utilisateur/agent.
- Composer avec mentions `@` fichiers, segments riches et threads persistants.
- Palette Quick Open (`Ctrl/Cmd+P`) et navigation au clavier.
- Interface entièrement en français.
- Skills disque local, fusion config workspace et contrôles d'approbation.

### Intégrations bots IM
mAI Coder peut héberger des agents sur des surfaces de chat externes, pas seulement dans l'UI Electron.

- **Plateformes** — Telegram, Slack, Discord et Feishu (Lark) via `main-src/bots/platforms/`.
- **Même runtime** — Les messages entrants passent par `botRuntime`.
- **Par intégration** — Activation, nom d'affichage, modèle par défaut, mode Composer, racines workspace, allowlists et prompt système supplémentaire.
- **Configuration UI** — Depuis **Paramètres → Bots** (`SettingsBotsPanel.tsx`).

---

## Architecture technique

```text
┌─────────────────────────────────────────────────────────┐
│                    Processus Renderer                   │
│  React + Vite  │  Monaco Editor  │  xterm.js Terminal  │
│  Composer / Chat / Plan / Agent UI                     │
└──────────────────────────┬──────────────────────────────┘
                           │  contextBridge (IPC)
┌──────────────────────────▼──────────────────────────────┐
│                      Processus Main                     │
│  agentLoop.ts  │  toolExecutor.ts  │  Adaptateurs LLM  │
│  gitService    │  threadStore      │  settingsStore    │
│  workspace     │  session LSP      │  Terminal PTY     │
└─────────────────────────────────────────────────────────┘
```

### Stack technique

| Technologie | Version | Usage |
|------------|---------|---------|
| **React** | ^19.2.4 | Framework UI |
| **Electron** | 41.1.0 | Shell desktop |
| **Vite** | ^6.0.3 | Build & dev server |
| **TypeScript** | ^5.9.3 | Développement typé |
| **Monaco Editor** | ^0.52.0 | Éditeur de code |
| **xterm.js** | ^5.5.0 | Émulateur terminal |
| **OpenAI SDK** | ^4.96.0 | Client OpenAI |
| **Anthropic SDK** | ^0.39.0 | Client Claude |
| **Google Generative AI** | ^0.21.0 | Client Gemini |
| **MCP SDK** | ^1.29.0 | Model Context Protocol |
| **node-pty** | ^1.1.0 | Support PTY |

## Structure du projet

```text
mAI-Coder/
├── main-src/                  # Bundlé -> electron/main.bundle.cjs
│   ├── index.ts               # Entrée app : fenêtres, userData, IPC
│   ├── agent/                 # agentLoop.ts, toolExecutor.ts, ...
│   ├── llm/                   # Adaptateurs OpenAI / Anthropic / Gemini
│   ├── lsp/                   # Session LSP TypeScript
│   ├── mcp/                   # Intégration MCP
│   ├── bots/                  # Contrôleur bots, runtime, plateformes
│   ├── ipc/register.ts        # Handlers IPC principaux
│   ├── ipc/handlers/          # Handlers IPC par domaine
│   ├── threadStore.ts         # Threads persistants (JSON)
│   ├── settingsStore.ts       # settings.json
│   └── workspace.ts           # Racine workspace & résolution chemins
├── src/                       # Renderer Vite + React
│   ├── App.tsx                # Layout shell, chat, modes composer
│   ├── AgentChatPanel.tsx
│   ├── EditorMainPanel.tsx
│   ├── SettingsPage.tsx
│   ├── WorkspaceExplorer.tsx
│   ├── hooks/
│   ├── i18n/                  # Messages français
│   └── ...
├── electron/
│   ├── main.bundle.cjs
│   └── preload.cjs            # contextBridge -> window.maiShell
├── docs/assets/               # Logo, captures
├── esbuild.main.mjs
├── vite.config.ts
└── package.json
```

## Stockage des données

Emplacement par défaut sous `userData` d'Electron :

- `mai/threads.json` : threads et messages.
- `mai/settings.json` : configuration modèles, clés API, layout, options agent et bots.
- `.mai/plans/` : documents plans Markdown générés en mode Plan.

Le renderer peut utiliser `localStorage` pour l'état UI léger, mais la source de vérité reste `threads.json`.

---

## Démarrage

### Prérequis

- **Node.js** >= 18
- **npm** >= 9
- **Git** recommandé

### Installation et lancement

```bash
git clone https://github.com/mDevsLabs/Coder.git
cd Coder
npm install
npm run desktop
```

### Développement

```bash
npm run dev          # Serveur dev avec hot reload
npm run dev:debug    # Avec DevTools ouvert
npm run icons        # Génère les icônes depuis SVG
```

---

## Remerciements

Merci à la communauté open-source et aux projets comme Claude Code qui ont démontré la puissance du développement piloté par agents — mAI Coder s'appuie sur cet élan avec sa propre vision transparente et local-first.

---

## Licence

Ce projet est open-source sous [Apache License 2.0](./LICENSE).
