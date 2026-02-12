# Eleganza — Sito Centro Estetico

Sito per il centro estetico **Eleganza** (Roma): landing, listino prezzi e form che invia le richieste via Telegram.  
Stack: **Astro 5**, **Tailwind CSS 4**, deploy su **Vercel**.

Obiettivi: CTA chiare (WhatsApp / telefono), contenuti sintetici, buone performance e SEO.

---

## Requisiti

- **Node.js** 18+ (consigliato 20 LTS)
- **npm** 9+ (o pnpm/yarn)

---

## Avvio rapido (per replicare il progetto)

### 1. Clona e installa

```bash
git clone <url-del-repo> estetista-website
cd estetista-website
npm install
```

### 2. Variabili d'ambiente (opzionale per sviluppo)

Il form “listino prezzi” invia le richieste tramite l’endpoint `/api/lead`, che usa **Telegram**.

Copia il file di esempio e compila i valori:

```bash
cp .env.example .env
```

Modifica `.env` e imposta:

| Variabile | Descrizione |
|-----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Token del bot Telegram (da [@BotFather](https://t.me/BotFather)) |
| `TELEGRAM_CHAT_IDS` | Uno o più ID chat (separati da virgola) dove ricevere i messaggi |
| `LARAVEL_PRICE_LIST_BASE_URL` | Base URL dell’app Laravel che espone il feed listino (es. `https://tuo-backend.example.com`) |
| `PRICE_LIST_FEED_SLUG` | Slug del listino nel backend (es. `listino-eleganzaromait`) |
| `PRICE_LIST_FEED_TOKEN` | Token per autenticare la richiesta al feed listino |

- **Telegram**: senza token/chat il sito gira, ma il form listino restituirà 500 all’invio.
- **Laravel listino**: se le tre variabili non sono impostate, la pagina `/servizi` usa i dati locali di `src/data/services.json`.

### 3. Avvia in sviluppo

```bash
npm run dev
```

Apri [http://localhost:4321](http://localhost:4321).

### 4. Build e anteprima produzione

```bash
npm run build
npm run preview
```

La build va in `./dist/`.

---

## Comandi

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa le dipendenze |
| `npm run dev` | Dev server su `http://localhost:4321` |
| `npm run build` | Build di produzione in `./dist/` |
| `npm run preview` | Anteprima locale della build |
| `npm run astro ...` | Astro CLI (es. `astro add`, `astro check`) |

---

## Struttura del progetto

```text
estetista-website/
├── public/                 # Asset statici (favicon, immagini, manifest)
│   └── images/             # Foto e asset del centro estetico
├── src/
│   ├── components/
│   │   └── sections/       # Sezioni della landing (Hero, Services, About, …)
│   ├── data/
│   │   └── services.json   # Listino prezzi (categorie e servizi)
│   ├── pages/
│   │   ├── index.astro     # Home (landing)
│   │   ├── servizi.astro   # Pagina listino prezzi
│   │   └── api/
│   │       └── lead.ts     # POST: invio richieste listino → Telegram
│   └── styles/
│       └── global.css      # Stili globali + Tailwind
├── astro.config.mjs        # Astro + Tailwind + adapter Vercel
├── package.json
├── tsconfig.json
└── .env.example            # Template variabili d'ambiente
```

---

## Dati e contenuti

- **Listino prezzi**:  
  - Se sono impostate `LARAVEL_PRICE_LIST_BASE_URL`, `PRICE_LIST_FEED_SLUG` e `PRICE_LIST_FEED_TOKEN`, la pagina `/servizi` carica il listino dall’API Laravel (`/price-list-feed/{slug}?token=...`).  
  - Altrimenti viene usato il fallback locale `src/data/services.json`.  
  Struttura dati: `categories[]` con `id`, `label`, `items[]` (nome, prezzo, note, badge).

- **Contatti, orari, testi**: sono nei componenti in `src/components/sections/` (es. `Contacts.astro`, `Footer.astro`). Per cambiare telefono/WhatsApp/indirizzo, editare lì.

---

## API: invio richieste listino (`/api/lead`)

- **Metodo**: `POST`
- **Body**: JSON con `items[]` (servizi selezionati), `phone`, `email`, `message`, `timeRange`, ecc.
- **Comportamento**: formatta un messaggio e lo invia a uno o più chat Telegram tramite Bot API.  
- **Variabili richieste in produzione**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_IDS` (vedi `.env.example`).

---

## Deploy (Vercel)

Il deploy avviene su **Vercel** (piano gratuito sufficiente per questo progetto).  
Configurazione: `@astrojs/vercel` e `output: 'static'`. Le pagine sono statiche; `/api/lead` viene deployato come serverless function.

1. Collega il repo a [Vercel](https://vercel.com).
2. Imposta le **Environment Variables** nel progetto Vercel:
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_IDS` (per il form listino)
   - opzionali: `LARAVEL_PRICE_LIST_BASE_URL`, `PRICE_LIST_FEED_SLUG`, `PRICE_LIST_FEED_TOKEN` (per listino da Laravel)
3. Deploy: Vercel userà `npm run build` automaticamente.

---

## Design

- **Palette**: beige/crema, rosa cipria, charcoal.
- **Font**: Cormorant Garamond (titoli), Manrope (testo).
- **Responsive**: CTA persistenti su mobile, spaziatura generosa, testi brevi.

---

## Note operative

- Immagini in `public/images/`: usare versioni ottimizzate e lazy loading dove possibile.
- CTA WhatsApp: link con testo precompilato per categoria/servizio.
- Mappe: link a Google Maps (eventuale fallback statico se necessario).
