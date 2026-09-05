-- =========================================================
-- TRAMBÓLICO 3D — Datos iniciales (seed)
-- Ejecutar DESPUÉS de 01_schema.sql
-- Podés editar/ocultar/eliminar estos productos luego desde /admin
-- =========================================================

insert into public.products
  (name, description, price, category, size, production_time, colors, customizable, active)
values
  (
    'Llavero Mediano Personalizado',
    'Precio por unidad sin envoltorio individual.',
    900,
    'Llaveros',
    '2 x 6 x 3 cm',
    'Aproximadamente 4 días',
    '{}',
    true,
    true
  ),
  (
    'Llavero Grande Personalizado',
    'Precio por unidad sin envoltorio individual.',
    1100,
    'Llaveros',
    '2.5 x 7 x 3.5 cm',
    'Aproximadamente 4 días',
    '{}',
    true,
    true
  ),
  (
    'Lagarto Articulado',
    'Articulado. Precio por unidad sin envoltorio individual. Opción llavero: $1000.',
    1500,
    'Articulados',
    '9 cm',
    'Aproximadamente 4 días',
    '{}',
    false,
    true
  ),
  (
    'Gyro Fidget Spinner',
    'Fidget giratorio, ideal para relajarte o entretenerte.',
    1500,
    'Fidget',
    '6 x 5.5 cm',
    'Aproximadamente 4 días',
    '{}',
    false,
    true
  ),
  (
    'Penta Click',
    'Modelo no giratorio.',
    1500,
    'Fidget',
    '4.5 cm',
    'Aproximadamente 4 días',
    '{}',
    false,
    true
  ),
  (
    'Tateti Corazones',
    'Juego de tateti temático. Opción adicional: llavero con nombre de 4 cm (+$800).',
    1800,
    'Juegos',
    '5 x 5.5 cm',
    'Aproximadamente 4 días',
    '{}',
    false,
    true
  ),
  (
    'Tateti Fútbol',
    'Juego de tateti temático de fútbol. Variantes: para ellos / para ellas.',
    2500,
    'Juegos',
    '7 x 7 cm',
    'Aproximadamente 4 días',
    '{"Para ellos","Para ellas"}',
    false,
    true
  ),
  (
    'Cubo Infinito',
    'Cubo articulado que se pliega infinitamente. Ideal como fidget o decoración.',
    2600,
    'Fidget',
    '8 x 4 cm',
    'Aproximadamente 4 días',
    '{}',
    false,
    true
  ),
  (
    'Cubo Slime 5x5',
    'Cubo tipo slime articulado, muy satisfactorio de manipular.',
    2900,
    'Fidget',
    '5 x 5 cm',
    'Aproximadamente 4 días',
    '{}',
    false,
    true
  ),
  (
    'Huevo de Dragón',
    'Pieza especial y decorativa, ideal para regalar o coleccionar.',
    3200,
    'Especiales',
    '4.5 cm',
    'Aproximadamente 4 días',
    '{}',
    false,
    true
  );
