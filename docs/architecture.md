# Arquitectura técnica

## Enfoque
Monolito modular con Next.js (interfaz pública y rutas server-side) + Payload CMS (admin, API y esquemas) + PostgreSQL (persistencia). No introducir microservicios para V1.

```text
Navegador visitante → Next.js App Router → Payload Local API / DB → PostgreSQL
                                       ↘ archivos multimedia (almacenamiento)
Navegador administrador    → Payload Admin     → controles de acceso → PostgreSQL
CTA WhatsApp        → https://wa.me/<numero>?text=<mensaje>
```

## Organización
- `src/app/(frontend)/[locale]`: rutas públicas localizadas.
- `src/app/(payload)`: carpeta reservada para rutas oficiales generadas por Payload.
- `src/collections`: entidades con múltiples registros.
- `src/globals`: configuración singular (empresa, sitio, navegación).
- `src/blocks`: secciones editables de páginas.
- `src/access`: utilidades para roles y permisos.
- `src/components`: componentes visuales reutilizables.
- `src/lib`: utilidades comunes, enlaces WhatsApp, etc.
- `src/i18n`: configuración y textos de interfaz.
- `src/migrations`: migraciones generadas por Payload.
- `tests`: pruebas unitarias, integradas y end-to-end.

## Seguridad
- Usuarios administrativos autenticados por Payload.
- Único rol privado en V1: Administrador. Aplicar controles de acceso por colección, global y operación en el servidor.
- Evitar exponer información de usuarios administrativos en APIs públicas.
- En producción, secretos fuera del repositorio, HTTPS y backups restaurables.
- No confiar en permisos visuales del panel sin reglas de acceso en el backend.

## Localización
- Sitio público en `es` (predeterminado) y `de`. Interfaz de administración exclusivamente en español.
- Campo `localized: true` para nombre, descripciones, slug cuando corresponda, SEO y textos.
- Las URL públicas podrán usar prefijo `/es/` y `/de/`.
- Requerir español completo para publicar. Para servir alemán, verificar sus campos obligatorios sin fallback desde español.

## Multimedia
- Colección Media para fotos y flyers, con metadatos, texto alternativo, tamaño y formato. Los videos se gestionan mediante enlaces desde el panel.
- Guardar archivos inicialmente en local para desarrollo; elegir proveedor persistente compatible para producción.
- No depender del sistema de archivos efímero del hosting.

## Publicación
- Servicios, trabajos y páginas admiten borradores revisables por el administrador. Solo exponer contenido publicado al público y revalidar las páginas cuando se publique.
- Previsualización restringida y logs de cambios críticos.
- Validar los campos requeridos en español al publicar. Mantener un estado editorial común. Aplicar la validación de traducción alemana a rutas, listados, selector de idioma, sitemap y hreflang.

## Despliegue (por decidir)
- Hosting compatible con Next.js + Payload, PostgreSQL gestionado, almacenamiento persistente multimedia, dominio y DNS.
- Entornos: local, staging opcional y producción.
- CI: lint/typecheck/tests, migraciones controladas y despliegue.

## Decisión sobre bootstrap
No sobrescribir el setup oficial de Payload con código no verificado. Crear la app mediante `npx create-payload-app` en carpeta limpia, seleccionar Postgres y trasladar el modelo de este scaffold. Ver `docs/next-steps.md`.

## Ampliación del sistema

Mantener las colecciones, los permisos y la interfaz pública separados por módulo. Añadir colecciones y roles conforme se definan nuevas funciones. Versionar las migraciones de PostgreSQL y comprobar en un entorno de prueba que preserven los datos antes de desplegarlas.
