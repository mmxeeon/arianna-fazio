-- Fix policies INSERT artworks (aggiunge WITH CHECK)
DROP POLICY IF EXISTS "Solo admin modifica artworks" ON public.artworks;
CREATE POLICY "Solo admin modifica artworks" ON public.artworks
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Aumenta il limite del prezzo da DECIMAL(10,2) a DECIMAL(12,2) per supportare valori più alti
ALTER TABLE public.artworks ALTER COLUMN price TYPE DECIMAL(12, 2);
