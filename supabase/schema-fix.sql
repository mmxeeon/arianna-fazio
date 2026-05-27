-- ============================================================
-- SCHEMA COMPLETO IDEMPOTENTE — Arianna Fazio
-- Esegui questo intero file nel SQL Editor di Supabase
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ARTWORKS
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

CREATE INDEX IF NOT EXISTS idx_artworks_status ON public.artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_featured ON public.artworks(featured);
CREATE INDEX IF NOT EXISTS idx_artworks_category ON public.artworks(category);
CREATE INDEX IF NOT EXISTS idx_artworks_slug ON public.artworks(slug);

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        VARCHAR(255),
  email       VARCHAR(255) NOT NULL,
  role        VARCHAR(50) NOT NULL DEFAULT 'user'
              CHECK (role IN ('admin', 'user')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MESSAGES
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

-- FUNZIONI E TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS artworks_updated_at ON public.artworks;
CREATE TRIGGER artworks_updated_at
  BEFORE UPDATE ON public.artworks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Artworks leggibili da tutti" ON public.artworks;
CREATE POLICY "Artworks leggibili da tutti" ON public.artworks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Solo admin modifica artworks" ON public.artworks;
CREATE POLICY "Solo admin modifica artworks" ON public.artworks FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Profilo visibile a sé stesso" ON public.profiles;
CREATE POLICY "Profilo visibile a sé stesso" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Chiunque invia messaggi" ON public.messages;
CREATE POLICY "Chiunque invia messaggi" ON public.messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin legge messaggi" ON public.messages;
CREATE POLICY "Admin legge messaggi" ON public.messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- STORAGE
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true)
ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "Immagini pubbliche" ON storage.objects;
CREATE POLICY "Immagini pubbliche" ON storage.objects FOR SELECT USING (bucket_id = 'artworks');

DROP POLICY IF EXISTS "Admin carica immagini" ON storage.objects;
CREATE POLICY "Admin carica immagini" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artworks' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admin elimina immagini" ON storage.objects;
CREATE POLICY "Admin elimina immagini" ON storage.objects FOR DELETE
  USING (bucket_id = 'artworks' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- CREA IL PROFILO DI ARIANNA E LA RENDI ADMIN
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'ari.fazio07@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
