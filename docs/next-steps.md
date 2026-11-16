# Fase 2 — Next.js, Payload y PostgreSQL

La aplicación se basa en la plantilla oficial Blank de Payload. El panel usa español como idioma de interfaz. La configuración de contenidos admite español y alemán. La base local tiene almacenamiento persistente y las tablas se crean mediante migraciones versionadas.

## Comprobación local

Sigue los comandos del [README](../README.md) para instalar dependencias, iniciar la base y aplicar las migraciones.

1. Abre `/admin`, crea el primer administrador y comprueba que ves el panel en español.
2. Cierra sesión y vuelve a iniciar sesión con la misma cuenta.
3. Reinicia PostgreSQL con `docker compose --env-file .env.local restart postgres`. Cuando la base vuelva a estar disponible, vuelve a iniciar sesión con la cuenta anterior.
4. Ejecuta `npm.cmd run typecheck` y `npm.cmd run build` para verificar el proyecto.

## Siguientes fases

- Fase 3: definir la autorización por operación para el rol Administrador y verificar las denegaciones.
- Fase 4: completar las colecciones y ajustes del catálogo, multimedia y páginas, y validar las reglas de borradores y publicación.
- Fases 5 a 7: construir las páginas públicas, la alternancia de idiomas y la integración de WhatsApp.

Referencias: [Instalación de Payload](https://payloadcms.com/docs/getting-started/installation), [PostgreSQL](https://payloadcms.com/docs/database/postgres) y [migraciones](https://payloadcms.com/docs/database/migrations).
