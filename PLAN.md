# Eleganza — Piano di Progetto (Astro + Tailwind CSS)

## 1) Obiettivo del sito
Convertire visite in **contatti reali** (WhatsApp, chiamate, richieste dirette) e fornire informazioni chiare sui servizi, orari e modalità di prenotazione.

### KPI
- Click su WhatsApp / Call
- Form invii
- Navigazioni a mappa/indirizzo

---

## 2) Architettura informativa

### 📍 Sezioni principali (Single Page)
1. **Hero**
   - Logo “Eleganza” (senza aggiunte)
   - Headline chiara: “Centro estetico a Roma — cura viso, corpo, epilazione e benessere”
   - CTA: “Prenota su WhatsApp” / “Chiama”
   - Sottotitolo con indirizzo + orari.

2. **Servizi**
   - Raggruppati per macro-aree (4 categorie)
     - Viso
     - Corpo
     - Laser/Epilazione
     - Mani/Piedi/Beauty
   - Ogni card: titolo, icona/foto, breve description.
   - CTA → WhatsApp specifico per categoria.

3. **Chi siamo**
   - Photo ritratto Chiara
   - Bio sintetica + punti di forza (professionalità, esperienza)
   - Recensioni brevi (3 testimonial reali, con stelle).

4. **Come lavoriamo**
   - 3 step processo (Consulto → Trattamento → Follow-up)
   - Icone e micro-copy.

5. **Gallery**
   - Grid 8–12 immagini
   - Lightbox (optional)
   - Solo immagini reali.

6. **Mappa & Contatti**
   - Indirizzo + Google Maps (o static map se cookie issue)
   - Tel + WhatsApp
   - Orari.

7. **Footer**
   - NAP coerente
   - Policy/Privacy
   - Link social.

---

## 3) Direttive di Design

### 🎨 Paletta colori
- **Beige marino / crema** (sfondo soft)
- **Rosa cipria** (accento)
- **Charcoal / nero profondo** (testi)
- Palette 5 colori max

### 🔣 Tipografia
- Headings: serif elegante
- Body: sans pulita
- Scale di gerarchia definite (H1–H4)

### 🖼 Immagini
- Ritratto Chiara + ambientazione + trattamenti specifici.
- Ottimizzate per web (lazysize, responsive breakpoints).

### 🔁 Gerarchia & UX
- CTA fissa su mobile (WhatsApp e Call)
- Sezioni ben distinte con whitespace generoso
- Nessun testo lungo + “muraglia di parole”

---

## 4) Specifiche funzionali (astro + tailwind)

### 🧱 Struttura code
src/pages/index.astro
src/components/sections/*
src/data/site.ts
src/assets/images/*


### 💾 Dati
Definire dataset:
- `services: {categoria, titolo, descr, slug}`
- `reviews: {nome, testo, stelle}`
- `contacts: {tel, whatsapp, address, hours}`

### 📌 SEO / Performance
- Meta tag (title, desc, OG)
- JSON-LD `LocalBusiness`
- Immagini ottimizzate con `<Image />`
- Lighthouse target ≥ 90 mobile

### 📱 Responsività
- Breakpoints chiari: sm / md / lg
- Navigation hamburger su mobile
- Sticky header + CTA bar su mobile

### 📍 Mappa
- Link google maps + fallback immagine statica (privacy)

---

## 5) Contenuti da raccogliere (prioritari)

- Logo SVG + pattern
- Lista servizi completa + (facoltativo) prezzi di listino
- Foto 20–30 di altissima qualità
- Testi brevi per ogni sezione
- 3–6 recensioni autentiche
- Orari e possibile policy (privacy / cookie)

---

## 6) Metriche di successo (QA)

### Dev QA
- Tutti i CTA funzionano
- Link WhatsApp precompilato corretto
- Schema + meta validi
- Immagini responsive e lazy

### UX QA
- Mobile navigation fluida
- CTA visibili su ogni viewport
- Test manuale 3 utenti (comprese conversioni)

---

## 7) Cosa evitare (errori critici)

- Sito stile builder di default (come ora) → fa sembrare brand amatoriale. :contentReference[oaicite:5]{index=5}
- Troppe sezioni/lunghe descrizioni
- Nessuna CTA persistente
- Colori contrasto basso

---

## 8) Timeline tecnica (4 settimane)

**Week 1**
- Setup Astro / Tailwind
- UI Kit + Figma
- Dati + contenuti raccolta

**Week 2**
- Hero, Servizi, About
- CTA & Navigation

**Week 3**
- Gallery, Reviews, Contacts
- SEO/Maps/JSON-LD

**Week 4**
- QA, Responsive polish, Analytics

---

## 9) Checkpoint & Review
- Daily standup con design + dev
- Review contenuti con cliente
- Go/No-Go su foto + testi

---

**Fine del documento**