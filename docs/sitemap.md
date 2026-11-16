# Sitemap y rutas V1

- `/es` y `/de` — inicio
- `/es/servicios` y `/de/dienstleistungen` — catálogo (slug de ruta a validar)
- `/es/servicios/[slug]` y equivalente alemán — detalle
- `/es/nosotros` / `/de/ueber-uns` — empresa
- `/es/trabajos` / `/de/referenzen` — galería
- `/es/contacto` / `/de/kontakt` — contacto
- `/es/privacidad` y equivalente — privacidad
- `/es/aviso-legal` y equivalente — aviso legal
- `/admin` — panel privado Payload

**Nota:** las carpetas fuente demostrativas usan segmentos en español. Las rutas alemanas finales exigirán una estrategia de mapeo (`rewrites` o segmentos dinámicos), que se definirá durante el arranque de Next.js. No asumir que estas URL ya funcionan.

## Componentes de páginas
Inicio: Hero, presentación, categorías/servicios destacados, galería y CTA WhatsApp.
Detalle: breadcrumb, título, portada, beneficios, galería, CTA.
Contacto: datos legales publicados, horarios, WhatsApp y mapa opcional con consentimiento.
