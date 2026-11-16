# Fases 1 y 2 — Entorno e instalación

## 1. Verificar herramientas
```powershell
node --version
npm --version
git --version
```
Usar versión de Node.js compatible con la documentación oficial **en la fecha de instalación**.

Verificar también el motor con `docker info`. En Windows, iniciar Docker Desktop si el motor no responde. La comprobación de GitHub Actions verifica las herramientas y que los archivos de entorno estén excluidos.

## 2. Fase 2 — Crear app Payload oficial
Este ZIP **no contiene dependencias instaladas**. Para evitar conflictos, usar el asistente oficial de Payload en una carpeta temporal junto a la de documentación:
```powershell
cd C:\Proyectos
npx create-payload-app
```
Escoger proyecto nuevo, Postgres y plantilla compatible; revisar opciones del asistente. **No instalar sobre carpetas de scaffold existentes sin revisar previamente los archivos que el asistente crea.**

## 3. Integrar modelo
- Copiar/adaptar las colecciones desde `src/collections` y globales desde `src/globals`.
- Integrar `src/access`, `src/lib`, `src/i18n` y componentes según el proyecto generado.
- Registrar las colecciones en `payload.config.ts` oficial.
- Mantener las rutas `(payload)` que genere la plantilla.
- Configurar `DATABASE_URL` y `PAYLOAD_SECRET` en `.env.local`.
- Crear y verificar migraciones de PostgreSQL.

## 4. Primer arranque
```powershell
npm install
npm run dev
```
Solo ejecutar estos comandos **dentro del proyecto oficial generado**, después de instalar/configurar PostgreSQL. El gestor de paquetes depende de las opciones escogidas.

## 5. Validación
- Abrir el frontend local y `/admin`.
- Crear usuario administrador inicial.
- Crear categoría, servicio y traducciones de prueba.
- Verificar permisos, visibilidad pública y enlace de WhatsApp.

Referencias oficiales:
- https://payloadcms.com/docs/getting-started/installation
- https://payloadcms.com/docs/database/postgres
