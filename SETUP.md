# Setup — Arianna Fazio

## 1. Installa le dipendenze

```bash
cd "arianna fazio"
npm install
```

## 2. Configura Supabase

1. Vai su [supabase.com](https://supabase.com) e crea un nuovo progetto
2. Copia `Project URL` e `anon key` dalle impostazioni → API
3. Copia il file `.env.local.example` → `.env.local` e incolla le chiavi
4. Nel SQL Editor di Supabase, esegui tutto il contenuto di `supabase/schema.sql`
5. In **Authentication → Providers**: abilita Email/Password
6. Crea l'account di Arianna: **Authentication → Users → Add user** con email e password
7. Dopo la creazione, esegui questa query SQL per renderla admin:
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE email = 'email-di-arianna@example.com';
   ```

## 3. Avvia in locale

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

Area admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 4. Crea la repository GitHub e pubblica su Netlify

```bash
git init
git add .
git commit -m "Initial commit — Arianna Fazio"
git remote add origin https://github.com/mmxeeon/arianna-fazio.git
git push -u origin main
```

Poi su [app.netlify.com](https://app.netlify.com):
1. "Add new site" → "Import from Git" → seleziona la repo `arianna-fazio`
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Aggiungi le variabili d'ambiente (stesse del `.env.local`)
5. Installa il plugin **@netlify/plugin-nextjs** (viene rilevato automaticamente)
6. Vai su **Domain settings** e collega `ariannafazio.it`

## 5. Collega il dominio

Nel pannello DNS del tuo registrar (es. Namecheap, Aruba, Cloudflare):
- Aggiungi record `CNAME`: `www` → `[nome-sito].netlify.app`
- Aggiungi record `A`: `@` → IP di Netlify (fornito nel pannello Netlify)

## 6. Aggiungere Stripe in futuro

1. Installa: `npm install @stripe/stripe-js stripe`
2. Aggiungi le variabili: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` e `STRIPE_SECRET_KEY`
3. Crea `app/api/checkout/route.ts` con una Stripe Checkout Session
4. La struttura del carrello è già pronta per ricevere il flusso di pagamento

## Struttura URL

| URL | Pagina |
|-----|--------|
| `/` | Homepage |
| `/shop` | Tutte le opere |
| `/shop/[slug]` | Dettaglio opera |
| `/about` | Chi sono |
| `/contatti` | Contatti |
| `/carrello` | Carrello |
| `/admin/login` | Login admin |
| `/admin/dashboard` | Dashboard Arianna |
| `/admin/artworks` | Gestione opere |
| `/admin/artworks/new` | Aggiungi opera |
| `/admin/artworks/[id]/edit` | Modifica opera |
