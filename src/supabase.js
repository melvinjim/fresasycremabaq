/* ------------------------------------------------------------------ *
 *  CONEXIÓN A LA NUBE (opcional)
 *
 *  Por defecto la página funciona guardando los cambios en el
 *  navegador (localStorage). Eso sirve para probarla, pero los
 *  cambios que hagas en el panel de administrador SOLO los verás tú
 *  en tu dispositivo.
 *
 *  Para que los cambios de precios, productos e imágenes los vean
 *  TODOS tus clientes, conecta una base de datos gratuita de Supabase:
 *
 *   1. Crea una cuenta en https://supabase.com (gratis)
 *   2. Crea un proyecto nuevo
 *   3. Ve a "SQL Editor" y ejecuta esto:
 *
 *        create table store (id text primary key, data jsonb);
 *        alter table store enable row level security;
 *        create policy "leer"       on store for select using (true);
 *        create policy "insertar"   on store for insert with check (true);
 *        create policy "actualizar" on store for update using (true);
 *
 *   4. Ve a Settings → API y copia:
 *        - "Project URL"  -> pégalo en url
 *        - "anon public"  -> pégalo en key
 *   5. Vuelve a desplegar en Vercel.
 * ------------------------------------------------------------------ */

export const CONFIG = {
  url: "https://TU_PROYECTO.supabase.co", // <- opcional
  key: "TU_ANON_KEY",                     // <- opcional
  table: "store",
};
