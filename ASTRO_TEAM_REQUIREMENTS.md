# Requisiti Integrazione Astro (Listino Prezzi Multi-Cliente)

## Obiettivo
Integrare il sito Astro statico di ogni cliente con il listino prezzi gestito in Laravel.

Ogni cliente ha:
- un feed JSON dedicato
- un token API dedicato
- un deploy hook Vercel dedicato

## Endpoint Feed JSON
Formato endpoint:

```text
GET https://davideochoa-gestione-clienti.test/price-list-feed/{slug}?token={token}
```

Esempio reale (placeholder):

```text
GET https://davideochoa-gestione-clienti.test/price-list-feed/cliente-123?token=xxxxxxxx
```

Note:
- `slug` identifica il cliente
- `token` è obbligatorio
- token errato o assente => `403`

## Payload JSON atteso
Il feed restituisce questa struttura:

```json
{
  "categories": [
    {
      "id": "viso",
      "label": "Trattamenti Viso",
      "items": [
        {
          "name": "Massaggio viso",
          "price": "€ 40,00",
          "note": "Opzionale"
        }
      ]
    }
  ]
}
```

Per il rendering in Astro usare solo:
- `categories`
- `categories[].items`

## Requisiti implementativi lato Astro
1. Fetch del feed in build-time (SSG), non in runtime browser.
2. Parametrizzare `slug` e `token` con variabili ambiente per progetto cliente.
3. Gestire fallback robusto se il feed fallisce (403/500/timeout):
   - mostrare messaggio tecnico in build log
   - opzionale fallback a JSON locale di emergenza
4. Nessun hardcode di token nel codice sorgente.
5. Non esporre token lato client (usarlo solo in fase build).

## Variabili ambiente richieste in Vercel (per ogni progetto cliente)
- `PRICE_LIST_FEED_SLUG`
- `PRICE_LIST_FEED_TOKEN`
- `LARAVEL_PRICE_LIST_BASE_URL` (es. `https://davideochoa-gestione-clienti.test`)

## Composizione URL consigliata
```text
${LARAVEL_PRICE_LIST_BASE_URL}/price-list-feed/${PRICE_LIST_FEED_SLUG}?token=${PRICE_LIST_FEED_TOKEN}
```

## Trigger Deploy
Quando il cliente salva il listino nel pannello Laravel:
- Laravel aggiorna i dati del cliente
- Laravel chiama il deploy hook Vercel del cliente
- Vercel rebuilda il sito Astro del cliente e rifà il fetch del feed

## Checklist QA Astro
1. Verificare che il progetto buildi correttamente con feed valido.
2. Verificare errore gestito con token non valido (403).
3. Verificare che il listino pubblicato cambi dopo un salvataggio + deploy hook.
4. Verificare che in output appaiano categorie e items correttamente.
