# Eleganza — Sito Centro Estetico (Astro + Tailwind)

Sito single-page per il centro estetico “Eleganza”. L'obiettivo e' convertire visite in contatti reali (WhatsApp, chiamate, richieste dirette) e fornire informazioni chiare su servizi, orari e prenotazione.

## Obiettivi
- CTA visibili e funzionanti (WhatsApp / Call)
- Contenuti sintetici e chiari
- Performance e SEO solidi

## Struttura del progetto
```text
/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   └── sections/
│   ├── data/
│   │   └── site.ts
│   └── pages/
│       └── index.astro
└── package.json
```

## Dati
Il contenuto principale e' centralizzato in `src/data/site.ts`:
- `services: { categoria, titolo, descr, slug }`
- `reviews: { nome, testo, stelle }`
- `contacts: { tel, whatsapp, address, hours }`

## Sezioni previste (single page)
1. Hero
2. Servizi (4 macro-categorie)
3. Chi siamo
4. Come lavoriamo
5. Gallery
6. Mappa & Contatti
7. Footer

## Design
- Palette: beige/crema + rosa cipria + charcoal
- Headings: serif elegante
- Body: sans pulita
- Spaziatura generosa, testi brevi, CTA persistenti su mobile

## Comandi
| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installa le dipendenze                            |
| `npm run dev`             | Avvia il dev server su `localhost:4321`           |
| `npm run build`           | Build di produzione in `./dist/`                  |
| `npm run preview`         | Anteprima locale della build                      |
| `npm run astro ...`       | Comandi Astro CLI                                 |

## Note operative
- Immagini reali e ottimizzate (lazy + responsive).
- CTA WhatsApp con testo precompilato per categoria.
- Mappe: link Google Maps + fallback statico se necessario.

