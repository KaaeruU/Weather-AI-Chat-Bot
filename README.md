# Weather AI Chat Bot 🌤️

Un chatbot AI intelligente per ottenere informazioni meteo in tempo reale, costruito con Next.js e Cloudflare Workers.
Check it out: http://weather-ai-chat-bot-1.vercel.app/

## ⚠️ Nota Importante su OpenMeteo

**OpenMeteo può restituire errori 429 (Too Many Requests) sui siti in deployment, indipendentemente dall'uso effettivo. **

Per un'esperienza ottimale, si consiglia di:

1. Eseguire il progetto in locale
2. Modificare la proprietà `api:` in `useChat` nel file `page.tsx` per puntare al tuo endpoint locale:

```tsx
const { messages, status, sendMessage } = useChat({
  transport: new DefaultChatTransport({
    api: "http://localhost:8787/api/chat/message", // Endpoint locale
  }),
});
```

## Tech Stack

### Frontend (Weather App)

- **Next.js 16** - Framework React per applicazioni web
- **React 19** - Libreria UI
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling e design system
- **AI SDK** (`@ai-sdk/react`) - Integrazione AI e chat
- **Motion (Framer Motion)** - Animazioni fluide
- **Radix UI** - Componenti UI accessibili
- **Class Variance Authority** - Gestione varianti componenti

### Backend (Weather Bot)

- **Cloudflare Workers** - Serverless edge computing
- **Hono** - Framework web ultraleggero
- **Workers AI Provider** - Integrazione AI su Cloudflare
- **Vercel AI SDK** - Gestione streaming AI
- **Zod** - Validazione schema e type safety
- **Wrangler** - CLI per deployment Cloudflare

## Struttura del Progetto

```
Weather-AI-Chat-Bot/
├── weather-app/          # Frontend Next.js
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx  # Pagina principale con chat UI
│   │   ├── components/   # Componenti React riutilizzabili
│   │   └── lib/          # Utilities e configurazioni
│   └── package.json
│
├── weather-bot/          # Backend Cloudflare Workers
│   └── apps/
│       └── api/
│           └── package.json
│
└── package.json          # Root monorepo config
```

## Getting Started

### Prerequisiti

- Node.js (versione 20+)
- npm o yarn
- Account Cloudflare (per il deployment del bot)

### Installazione

1. **Clona la repository**

```bash
git clone https://github.com/KaaeruU/Weather-AI-Chat-Bot.git
cd Weather-AI-Chat-Bot
```

2.  **Installa le dipendenze**

```bash
npm install
```

### Avvio in Locale

#### Frontend (Weather App)

```bash
cd weather-app
npm run dev
```

L'app sarà disponibile su `http://localhost:3000`

#### Backend (Weather Bot)

```bash
cd weather-bot/apps/api
npm run dev
```

L'API sarà disponibile su `http://localhost:8787`

**Ricorda di aggiornare l'URL dell'API in `weather-app/src/app/page.tsx` per puntare a localhost! **

## Build e Deployment

### Frontend

```bash
cd weather-app
npm run build
npm run start
```

### Backend

```bash
cd weather-bot/apps/api
npm run deploy
```

## Funzionalità

- **Chat Interattiva** - Interfaccia conversazionale fluida con animazioni
- **Meteo in Tempo Reale** - Informazioni meteo aggiornate tramite OpenMeteo API
- **AI-Powered** - Risposte intelligenti generate tramite AI
- **Responsive Design** - Ottimizzato per desktop e mobile
- **Edge Computing** - Backend serverless su Cloudflare Workers per prestazioni ottimali
- **UI Moderna** - Design pulito con Tailwind CSS e animazioni Motion

## Configurazione

### Modifica Endpoint API

Per cambiare l'endpoint API, modifica il file `weather-app/src/app/page.tsx`:

```tsx
const { messages, status, sendMessage } = useChat({
  transport: new DefaultChatTransport({
    api: "TUO_ENDPOINT_QUI",
  }),
});
```

## Scripts Disponibili

### Weather App

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea la build di produzione
- `npm run start` - Avvia il server di produzione
- `npm run lint` - Esegue ESLint

### Weather Bot

- `npm run dev` - Avvia Wrangler in modalità sviluppo
- `npm run deploy` - Deploy su Cloudflare Workers
- `npm run cf-typegen` - Genera i tipi TypeScript per Cloudflare

## Contributing

Le contribuzioni sono benvenute! Sentiti libero di aprire issue o pull request.

## License

Questo progetto è privato.

## Autore

**KaaeruU**

---

Made with ❤️ using Next.js and Cloudflare Workers by Flavio Patti
