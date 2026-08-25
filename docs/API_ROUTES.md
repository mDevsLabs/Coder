# 📚 Documentation Complète des Routes API mAI

> **URL de Base** : `https://mai.val.run`  
> **Authentification** :  
> - **Clé API mProjects** : `Authorization: Bearer <VOTRE_CLE_API>` (ou header `x-api-key: <VOTRE_CLE_API>`)
> - **Token JWT de Session** : `Authorization: Bearer <VOTRE_JWT_TOKEN>`
> - **Content-Type** : `application/json` (ou `multipart/form-data` pour l'upload de fichiers)

---

## 📑 Sommaire
1. [🧠 Modèles & Chat Completions](#1--modèles--chat-completions)
2. [🎨 Génération d'Images](#2--génération-dimages)
3. [🌐 Recherche Web](#3--recherche-web)
4. [🔐 Authentification & Profil](#4--authentification--profil)
5. [💻 Appareils & Sessions](#5--appareils--sessions)
6. [📁 Projets & Écosystème](#6--projets--écosystème)
7. [☁️ Stockage Cloud & Fichiers](#7--stockage-cloud--fichiers)

---

## 1. 🧠 Modèles & Chat Completions

### `POST /v1/chat/completions`
Endpoint standard compatible OpenAI pour les complétions de chat (avec support du streaming, multi-modèles et function calling).

* **En-têtes** : `Authorization: Bearer <VOTRE_CLE_API_OU_JWT>`, `Content-Type: application/json`

#### 📋 cURL
```bash
curl https://mai.val.run/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_CLE_API>" \
  -d '{
    "model": "stealth/ox-alpha",
    "messages": [
      { "role": "system", "content": "Tu es un assistant serviable et concis." },
      { "role": "user", "content": "Explique la relativité en 2 phrases." }
    ],
    "temperature": 0.7,
    "max_tokens": 150
  }'
```

#### 💻 Node.js (Fetch natif)
```javascript
const response = await fetch("https://mai.val.run/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.MAI_API_KEY || "<VOTRE_CLE_API>"}`
  },
  body: JSON.stringify({
    model: "stealth/ox-alpha",
    messages: [
      { role: "system", content: "Tu es un assistant serviable et concis." },
      { role: "user", content: "Explique la relativité en 2 phrases." }
    ],
    temperature: 0.7,
    max_tokens: 150
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

---

### `GET /v1/models`
Liste tous les modèles LLM disponibles selon le forfait du compte (Free, Plus, Pro, Max).

#### 📋 cURL
```bash
curl https://mai.val.run/v1/models \
  -H "Authorization: Bearer <VOTRE_CLE_API>"
```

#### 💻 Node.js
```javascript
const res = await fetch("https://mai.val.run/v1/models", {
  headers: {
    "Authorization": `Bearer ${process.env.MAI_API_KEY || "<VOTRE_CLE_API>"}`
  }
});
const models = await res.json();
console.log("Modèles disponibles :", models.data.map(m => m.id));
```

---

### `GET /v1/models/mai` ou `GET /v1/mai/models`
Liste les modèles locaux de la famille **mAI** (`mai-1.5-light`, `mai-1.5-apex`, `mai-1.5-opal`, etc.).

#### 📋 cURL
```bash
curl https://mai.val.run/v1/models/mai
```

#### 💻 Node.js
```javascript
const res = await fetch("https://mai.val.run/v1/models/mai");
const data = await res.json();
console.log(data.data);
```

---

### `POST /v1/messages` (Proxy compatible SDK Anthropic Claude)
Endpoint proxy direct pour le SDK Anthropic (`@anthropic-ai/sdk`).

#### 📋 cURL
```bash
curl https://mai.val.run/v1/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_CLE_API>" \
  -d '{
    "model": "anthropic/claude-3-haiku",
    "messages": [
      { "role": "user", "content": "Bonjour Claude !" }
    ],
    "max_tokens": 100
  }'
```

#### 💻 Node.js
```javascript
const res = await fetch("https://mai.val.run/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.MAI_API_KEY || "<VOTRE_CLE_API>"}`
  },
  body: JSON.stringify({
    model: "anthropic/claude-3-haiku",
    messages: [{ role: "user", content: "Bonjour !" }],
    max_tokens: 100
  })
});
console.log(await res.json());
```

---

### `POST /v1beta/models/:model:generateContent` (Proxy compatible Google Gemini)
Endpoint proxy pour le SDK Google Generative AI.

#### 📋 cURL
```bash
curl "https://mai.val.run/v1beta/models/google/gemini-2.5-flash:free:generateContent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_CLE_API>" \
  -d '{
    "contents": [
      { "role": "user", "parts": [{ "text": "Quelle est la capitale de la France ?" }] }
    ]
  }'
```

#### 💻 Node.js
```javascript
const res = await fetch("https://mai.val.run/v1beta/models/google/gemini-2.5-flash:free:generateContent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.MAI_API_KEY || "<VOTRE_CLE_API>"}`
  },
  body: JSON.stringify({
    contents: [{ role: "user", parts: [{ text: "Bonjour Gemini !" }] }]
  })
});
console.log(await res.json());
```

---

### `GET /usage` & `POST /log-usage`
Vérification et enregistrement des quotas hebdomadaires de tokens.

#### 📋 cURL
```bash
# Vérifier l'utilisation
curl https://mai.val.run/usage \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"

# Enregistrer l'utilisation
curl https://mai.val.run/log-usage \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>" \
  -d '{ "tokensUsed": 150 }'
```

---

## 2. 🎨 Génération d'Images (via OpenRouter)

### `GET /v1/models/images`
Liste tous les modèles de génération d'images disponibles.
- **Comptes Free** : Accès automatique aux modèles coûtant **moins de 0.05$ / image** (ex: `black-forest-labs/flux-1-schnell`, `black-forest-labs/flux-1-dev`, `bytedance-seed/seedream-4.5`, `recraft-ai/recraft-v3`).
- **Comptes Payants (Plus, Pro, Max)** : Accès à **tous les modèles d'images** (ex: `black-forest-labs/flux-1.1-pro`, `stabilityai/stable-diffusion-3.5-large`, `google/imagen-3.0-generate-002`, `openai/dall-e-3`, `midjourney/v6`).
- **Format de réponse** : Inclut `id`, `name`, `description`, `created`, `supported_parameters`, etc. *(le champ pricing est masqué)*.

#### 📋 cURL
```bash
curl https://mai.val.run/v1/models/images \
  -H "Authorization: Bearer <VOTRE_CLE_API>"
```

#### 💻 Node.js
```javascript
const res = await fetch("https://mai.val.run/v1/models/images", {
  headers: { "Authorization": `Bearer ${process.env.MAI_API_KEY || "<VOTRE_CLE_API>"}` }
});
const { data } = await res.json();
console.table(data.map(m => ({ id: m.id, name: m.name, description: m.description })));
```

---

### `POST /v1/images/generations`
Génère une image via le moteur OpenRouter sélectionné.

#### 📋 cURL (Exemple avec Flux Schnell)
```bash
curl https://mai.val.run/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_CLE_API>" \
  -d '{
    "model": "black-forest-labs/flux-1-schnell",
    "prompt": "Un petit panda roux portant des lunettes, style peinture aquarelle, 4k",
    "size": "1024x1024"
  }'
```

#### 📋 cURL (Exemple avec Flux 1.1 Pro - Compte Plus/Pro/Max)
```bash
curl https://mai.val.run/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_CLE_API>" \
  -d '{
    "model": "black-forest-labs/flux-1.1-pro",
    "prompt": "Un astronaute jouant du piano sur la Lune, style néon cyberpunk, 4k",
    "size": "1024x1024"
  }'
```

#### 💻 Node.js (Fetch natif)
```javascript
const response = await fetch("https://mai.val.run/v1/images/generations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.MAI_API_KEY || "<VOTRE_CLE_API>"}`
  },
  body: JSON.stringify({
    model: "black-forest-labs/flux-1-schnell",
    prompt: "Un astronaute jouant du piano sur la Lune, cyberpunk",
    size: "1024x1024"
  })
});

const data = await response.json();
const imageSrc = data.data[0].url || `data:image/png;base64,${data.data[0].b64_json}`;
console.log("Image générée :", imageSrc);
```

---

### `GET /v1/images/usage` & `GET /v1/images/history`
Consulte les quotas restants du jour et l'historique des générations.

#### 📋 cURL
```bash
# Quotas d'images
curl https://mai.val.run/v1/images/usage \
  -H "Authorization: Bearer <VOTRE_CLE_API>"

# Historique
curl https://mai.val.run/v1/images/history \
  -H "Authorization: Bearer <VOTRE_CLE_API>"
```

---

## 3. 🌐 Recherche Web

### `POST /v1/web/search` & `GET /v1/web/search`
Exécute une recherche Web en temps réel via l'API You.com avec triple fallback automatique.

#### 📋 cURL
```bash
# Via POST (JSON)
curl https://mai.val.run/v1/web/search \
  -H "Content-Type: application/json" \
  -d '{ "query": "Dernières actualités IA 2026", "count": 5 }'

# Via GET (Paramètres URL)
curl "https://mai.val.run/v1/web/search?q=Dernières+actualités+IA&count=3"
```

#### 💻 Node.js
```javascript
const res = await fetch("https://mai.val.run/v1/web/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "mAI Coder actualités", count: 3 })
});

const { results } = await res.json();
results.forEach(r => console.log(`- ${r.title} : ${r.url}`));
```

---

## 4. 🔐 Authentification & Profil

### `POST /register` & `POST /verify-register`
Inscription en 2 étapes (envoi de code email puis validation).

#### 📋 cURL
```bash
# Étape 1 : Demande d'inscription
curl https://mai.val.run/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "utilisateur@exemple.fr", "username": "mon_pseudo", "password": "MotDePasseFort123!" }'

# Étape 2 : Validation avec le code reçu par email
curl https://mai.val.run/verify-register \
  -H "Content-Type: application/json" \
  -d '{ "email": "utilisateur@exemple.fr", "username": "mon_pseudo", "password": "MotDePasseFort123!", "code": "123456" }'
```

---

### `POST /login` & `POST /verify-login`
Connexion en 2 étapes sécurisée par code email (OTP).

#### 📋 cURL
```bash
# Étape 1 : Demande de connexion
curl https://mai.val.run/login \
  -H "Content-Type: application/json" \
  -d '{ "identifier": "utilisateur@exemple.fr", "password": "MotDePasseFort123!" }'

# Étape 2 : Vérification du code email
curl https://mai.val.run/verify-login \
  -H "Content-Type: application/json" \
  -d '{ "email": "utilisateur@exemple.fr", "code": "123456" }'
```

#### 💻 Node.js
```javascript
// 1. Demande de login
const loginRes = await fetch("https://mai.val.run/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ identifier: "utilisateur@exemple.fr", password: "MotDePasseFort123!" })
});
console.log(await loginRes.json()); // { status: "verification_required" }

// 2. Vérification OTP
const verifyRes = await fetch("https://mai.val.run/verify-login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "utilisateur@exemple.fr", code: "123456" })
});
const { token } = await verifyRes.json();
console.log("Token JWT :", token);
```

---

### `POST /update-profile`
Mise à jour du profil (nom d'utilisateur, téléphone, code abonnement / forfait).

#### 📋 cURL
```bash
curl https://mai.val.run/update-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>" \
  -d '{ "username": "nouveau_pseudo", "subscription_code": "<CODE_ABONNEMENT>" }'
```

---

### `GET /api-keys`
Récupère la liste des clés API associées au compte connecté.

#### 📋 cURL
```bash
curl https://mai.val.run/api-keys \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"
```

---

## 5. 💻 Appareils & Sessions

### `GET /v1/devices` & `DELETE /v1/devices/:id`
Gestion des sessions et appareils connectés.

#### 📋 cURL
```bash
# Lister les appareils
curl https://mai.val.run/v1/devices \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"

# Déconnecter les autres appareils
curl -X DELETE https://mai.val.run/v1/devices/others \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"

# Déconnecter un appareil spécifique
curl -X DELETE https://mai.val.run/v1/devices/42 \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"
```

#### 💻 Node.js
```javascript
const res = await fetch("https://mai.val.run/v1/devices", {
  headers: { "Authorization": `Bearer ${token}` }
});
const { devices } = await res.json();
console.table(devices);
```

---

## 6. 📁 Projets & Écosystème

### `GET /v1/projects` & `POST /v1/projects`
Gestion des projets de l'écosystème mAI et des projets personnalisés.

#### 📋 cURL
```bash
# Lister les projets
curl https://mai.val.run/v1/projects \
  -H "Authorization: Bearer <VOTRE_CLE_API>"

# Créer un projet
curl https://mai.val.run/v1/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_CLE_API>" \
  -d '{
    "name": "Mon Projet IA",
    "description": "Application cliente utilisant mAI API",
    "isPublic": false
  }'
```

---

### `GET /v1/projects/:id` & `PUT /v1/projects/:id` & `DELETE /v1/projects/:id`

#### 📋 cURL
```bash
# Détails d'un projet
curl https://mai.val.run/v1/projects/coder \
  -H "Authorization: Bearer <VOTRE_CLE_API>"

# Mettre à jour un projet
curl -X PUT https://mai.val.run/v1/projects/proj-abc123xyz \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_CLE_API>" \
  -d '{ "name": "Nouveau Nom Projet" }'

# Supprimer un projet
curl -X DELETE https://mai.val.run/v1/projects/proj-abc123xyz \
  -H "Authorization: Bearer <VOTRE_CLE_API>"
```

---

## 7. ☁️ Stockage Cloud & Fichiers

### `GET /cloud/storage` & `GET /cloud/files`
Consulte l'espace disque consommé et la liste des fichiers cloud.

#### 📋 cURL
```bash
# Consulter l'espace utilisé
curl https://mai.val.run/cloud/storage \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"

# Lister les fichiers
curl https://mai.val.run/cloud/files \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"
```

---

### `POST /cloud/upload` (Upload multipart)
Téléverse un fichier vers le stockage S3 / Cloudflare R2.

#### 📋 cURL
```bash
curl -X POST https://mai.val.run/cloud/upload \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>" \
  -F "file=@/chemin/vers/mon_document.pdf"
```

#### 💻 Node.js (FormData)
```javascript
import fs from "node:fs";

const formData = new FormData();
const fileBlob = new Blob([fs.readFileSync("./mon_document.pdf")], { type: "application/pdf" });
formData.append("file", fileBlob, "mon_document.pdf");

const res = await fetch("https://mai.val.run/cloud/upload", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`
  },
  body: formData
});

const data = await res.json();
console.log("Fichier uploadé :", data.file);
```

---

### `DELETE /cloud/files/:id`
Supprime définitivement un fichier stocké dans le Cloud.

#### 📋 cURL
```bash
curl -X DELETE https://mai.val.run/cloud/files/42 \
  -H "Authorization: Bearer <VOTRE_JWT_TOKEN>"
```
