-- ============================================================
-- SCHEMA SUPABASE — Arianna Fazio
-- Esegui questo file nel SQL editor di Supabase
-- ============================================================

-- Abilita estensioni
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABELLA: artworks
-- ============================================================
CREATE TABLE IF NOT EXISTS public.artworks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           VARCHAR(255) NOT NULL,
  slug            VARCHAR(255) UNIQUE NOT NULL,
  description     TEXT,
  technique       VARCHAR(255),
  dimensions      VARCHAR(100),
  year            INTEGER CHECK (year >= 1900 AND year <= 2100),
  price           DECIMAL(10, 2) CHECK (price >= 0),
  category        VARCHAR(100),
  image_url       TEXT,
  gallery_images  TEXT[] DEFAULT '{}',
  status          VARCHAR(50) NOT NULL DEFAULT 'available'
                  CHECK (status IN ('available', 'sold', 'unavailable')),
  featured        BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indici
CREATE INDEX IF NOT EXISTS idx_artworks_status ON public.artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_featured ON public.artworks(featured);
CREATE INDEX IF NOT EXISTS idx_artworks_category ON public.artworks(category);
CREATE INDEX IF NOT EXISTS idx_artworks_slug ON public.artworks(slug);

-- Trigger per updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER artworks_updated_at
  BEFORE UPDATE ON public.artworks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELLA: profiles (estende auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        VARCHAR(255),
  email       VARCHAR(255) NOT NULL,
  role        VARCHAR(50) NOT NULL DEFAULT 'user'
              CHECK (role IN ('admin', 'user')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: crea profilo automaticamente alla registrazione
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- TABELLA: messages (modulo contatti)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(50),
  message     TEXT NOT NULL,
  artwork_id  UUID REFERENCES public.artworks(id) ON DELETE SET NULL,
  read        BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- artworks: lettura pubblica, scrittura solo admin
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artworks leggibili da tutti"
  ON public.artworks FOR SELECT
  USING (true);

CREATE POLICY "Solo admin può modificare artworks"
  ON public.artworks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- profiles: visibili solo a sé stessi e agli admin
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profilo visibile a sé stesso"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin vede tutti i profili"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- messages: inserimento pubblico, lettura solo admin
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chiunque può inviare messaggi"
  ON public.messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Solo admin legge i messaggi"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- STORAGE: bucket "artworks"
-- ============================================================
-- Esegui nel SQL editor:
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true)
ON CONFLICT DO NOTHING;

-- Policy storage
CREATE POLICY "Immagini pubbliche in lettura"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artworks');

CREATE POLICY "Solo admin carica immagini"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'artworks'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Solo admin elimina immagini"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'artworks'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- IMPOSTA ARIANNA COME ADMIN
-- Dopo aver creato il suo account con email/password in Supabase Auth:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'arianna@example.com';
-- ============================================================
