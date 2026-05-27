-- Popola le 4 opere iniziali di Arianna Fazio
-- (le immagini sono in /public/images/opere/ del progetto)

INSERT INTO public.artworks (title, slug, description, technique, dimensions, year, price, category, image_url, status, featured)
VALUES
  (
    'Sussurri di Petali',
    'sussurri-di-petali',
    'Un bouquet di peonie dipinto a olio, dove i petali sembrano respirare luce. Un omaggio alla fragilità della bellezza.',
    'Olio su tela',
    '60x60 cm',
    2025,
    850,
    'Natura morta',
    '/images/opere/peonie-vaso.jpg',
    'available',
    true
  ),
  (
    'Riflessi di Primavera',
    'riflessi-di-primavera',
    'Un ciliegio in fiore al tramonto, riflesso sull''acqua quieta. Un istante di pace cristallizzato nel colore.',
    'Olio su tela',
    '70x70 cm',
    2025,
    950,
    'Paesaggi',
    '/images/opere/ciliegio-tramonto.jpg',
    'available',
    true
  ),
  (
    'Petali d''Oro',
    'petali-doro',
    'Composizione astratta in olio e foglia oro. La materia incontra la luce in un dialogo silenzioso tra rosa e dorato.',
    'Olio e foglia oro su tela',
    '80x80 cm',
    2025,
    1200,
    'Astratto',
    '/images/opere/peonie-oro.jpg',
    'available',
    true
  ),
  (
    'Dolce Attesa',
    'dolce-attesa',
    'Un gatto bianco tra le peonie. La quiete e l''eleganza si fondono in un ritratto sospeso nel tempo.',
    'Olio su tela',
    '60x60 cm',
    2025,
    750,
    'Animali',
    '/images/opere/gatto-bianco.jpg',
    'available',
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description,
  technique = EXCLUDED.technique,
  dimensions = EXCLUDED.dimensions,
  year = EXCLUDED.year,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;
