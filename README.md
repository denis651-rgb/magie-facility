# MAGIE FACILITY SERVICE C&D

Sitio corporativo para una empresa de limpieza y mantenimiento en Suiza. La primera versión contempla catálogo, trabajos, páginas corporativas en español y alemán y presupuestos por WhatsApp.

La base técnica utiliza Next.js, Payload CMS y PostgreSQL. El panel en español está en `/admin`. El alcance editorial y las páginas públicas están descritos en [los requisitos](docs/requirements.md).

## Arranque local en Windows

Requisitos: Docker Desktop, Git, npm y Node.js compatible con `package.json` (22.23.4 o posterior de la rama 22, o 24.22.1 o posterior). Inicia Docker Desktop antes de ejecutar los comandos.

1. Copia `.env.example` a `.env.local`. Pon la misma contraseña alfanumérica en `POSTGRES_PASSWORD` y dentro de `DATABASE_URL`. Genera un valor independiente para `PAYLOAD_SECRET`. Puedes generar cada valor con `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
2. Desde la raíz del proyecto, ejecuta:

   ```powershell
   npm.cmd ci
   docker compose --env-file .env.local up -d --wait
   npm.cmd run payload -- migrate
   npm.cmd run dev
   ```

3. Abre [el panel local](http://localhost:3000/admin) y crea tu cuenta de Administrador desde el formulario inicial.

PostgreSQL escucha en `127.0.0.1:55432`. Docker conserva los datos en un volumen local al detener e iniciar el servicio. Mantén los valores de `.env.local` para volver a conectar con la base existente.

El [registro de decisiones](docs/decisions.md) y la [guía técnica](docs/next-steps.md) describen el alcance y los pasos pendientes.
