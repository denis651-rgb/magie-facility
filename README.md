# MAGIE FACILITY SERVICE C&D — Sitio web corporativo

**Estado:** Fase 0 cerrada en alcance y decisiones. Pendiente iniciar el entorno técnico. Este paquete es un **scaffold documental y de código inicial**, no una aplicación instalada ni ejecutable aún.

## Objetivo
Sitio corporativo para una empresa de limpieza y servicios en Suiza. Catálogo con categorías, servicios, trabajos realizados, páginas corporativas, dos idiomas (es/de) y solicitud de presupuesto mediante WhatsApp. Panel editorial con Payload CMS.

## Tecnologías previstas
- Next.js + TypeScript (App Router)
- Payload CMS
- PostgreSQL
- Español (`es`) por defecto, alemán (`de`) opcional
- WhatsApp mediante enlace `wa.me` (sin checkout ni pagos)

## Primeros pasos en Windows
1. Extraer el ZIP, por ejemplo en `C:\Proyectos\magie-facility-web`.
2. Abrir PowerShell en la carpeta y ejecutar `code .`.
3. Leer `docs/requirements.md`, `docs/architecture.md` y `docs/database.md`.
4. Revisar `docs/decisions.md` y completar las decisiones pendientes.
5. **No ejecutar `npm install` en este paquete:** todavía no incluye `package.json` ni la plantilla oficial de Payload.
6. Cuando se apruebe el análisis, inicializar Next.js + Payload **con la plantilla oficial** (preferiblemente en una carpeta temporal), y transferir los archivos de `src/` y `docs/` al proyecto generado, ajustando las rutas. Consultar `docs/next-steps.md`.

## ¿Qué incluye este paquete?
- Arquitectura propuesta y documentación de requisitos.
- Modelo lógico de datos con campos, relaciones y reglas.
- Mapa de páginas, matriz de permisos, criterios de aceptación y fases.
- Ejemplos de colecciones, globals, i18n, utilidades y componentes de Next.js/Payload en `src/`.
- `.env.example`, `.gitignore`, plantillas de pruebas y directorios de trabajo.

## Advertencias
- El código incluido es de partida y **no está integrado ni probado** contra una instalación concreta de Payload.
- No se incluyen logos, fotos, claves ni datos privados del cliente.
- Los textos, fotografías, categorías e información legal de ejemplo deben sustituirse y validarse antes de publicar.
- La estructura física SQL será generada por el adaptador de Payload y sus migraciones; `docs/database.md` describe el modelo lógico.
