# Matriz de permisos

| Acción | Administrador | Visitante |
|---|---|---|
| Consultar contenido publicado | Sí | Sí |
| Crear, editar y revisar borradores | Sí | No |
| Publicar y despublicar | Sí | No |
| Subir fotos y flyers y añadir enlaces de video | Sí | No |
| Editar datos empresariales y navegación | Sí | No |
| Administrar cuentas administrativas | Sí | No |

Administrador es el único rol privado en V1. Payload aplica la autorización en el servidor, tanto en el panel como en la API.

- El visitante puede leer categorías activas y versiones publicadas de servicios, trabajos y páginas. Las revisiones y el historial requieren una cuenta administrativa activa.
- Las cuentas, la biblioteca multimedia y los ajustes globales requieren una cuenta administrativa activa. El sitio público expondrá únicamente los datos y archivos que sus páginas necesiten.
- Desactivar una cuenta elimina sus sesiones. Volver a activarla requiere un nuevo inicio de sesión.
