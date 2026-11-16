# Requisitos — Versión 1.0

## 1. Objetivo
Permitir que visitantes conozcan la empresa MAGIE FACILITY SERVICE C&D, exploren servicios, vean trabajos y soliciten cotizaciones por WhatsApp. El propietario gestiona el sitio sin intervención del desarrollador.

## 2. Alcance incluido
- Inicio con hero, descripción, servicios destacados, trabajos y CTA.
- Catálogo: categorías jerárquicas, servicios, detalle por slug.
- Nosotros, trabajos, contacto y páginas legales.
- Panel editorial en español: empresa, navegación, categorías, servicios, trabajos, páginas y multimedia. Permite subir fotos y flyers y registrar enlaces de video.
- Un único rol privado en V1: Administrador. Se podrán incorporar otros roles en versiones futuras.
- Sitio público en español y alemán, con español como idioma inicial. El panel permanece en español al editar contenido en alemán.
- SEO por página/servicio: título, descripción, slug e imagen social opcional.
- Enlaces de WhatsApp con texto contextual por servicio.
- Diseño moderno e institucional, adaptable a móvil y escritorio, con accesibilidad básica y navegación con teclado.

## 3. Fuera de alcance inicial
- Checkout, precios visibles, pagos y carrito.
- Portal de clientes, cuentas públicas, seguimiento automatizado de cotizaciones.
- CRM, facturación, analítica avanzada y chatbot.
- WhatsApp Business API, envío automático o lectura de conversaciones.

## 4. Actores
- **Visitante:** consulta contenidos y abre WhatsApp; no necesita autenticación.

- **Administrador:** gestiona contenido, multimedia, datos empresariales y cuentas administrativas. Puede guardar borradores, revisarlos y publicar o despublicar contenido.


## 5. Historias de usuario prioritarias
- US-01: Como visitante, quiero listar servicios por categoría.
- US-02: Como visitante, quiero ver el detalle de un servicio en mi idioma.
- US-03: Como visitante, quiero abrir WhatsApp con el servicio seleccionado.
- US-04: Como administrador, quiero guardar borradores de servicios, trabajos y páginas, y revisarlos antes de publicar.
- US-05: Como administrador, quiero publicar servicios y gestionar sus traducciones.
- US-06: Como administrador, quiero actualizar teléfono, logo y contenidos de inicio.
- US-07: Como administrador, quiero subir fotos y flyers y añadir enlaces de video.
- US-08: Como visitante, quiero ver los trabajos publicados de la empresa.

## 6. Reglas de negocio
1. Los servicios públicos requieren estado publicado, título, slug, categoría, descripción e imagen principal.
2. Un slug debe ser único por idioma y ámbito de ruta; las modificaciones de slugs deben contemplar redirecciones.
3. El administrador puede guardar borradores sin publicar. El público solo tiene acceso al contenido publicado y los borradores quedan fuera del buscador y del sitemap.
4. Para publicar, el contenido debe estar completo en español. La versión alemana se muestra cuando sus campos obligatorios están completos. Hasta entonces se omite de las rutas públicas, catálogo, selector de la ficha, sitemap y hreflang.
5. Una categoría archivada no se muestra en la navegación; evitar dejar servicios publicados huérfanos.
6. Los archivos referenciados por páginas publicadas no se eliminan sin resolver relaciones.
7. WhatsApp solo prepara una conversación: no confirma envío ni solicitud completada.
8. Los datos legales y corporativos finales se validan antes del lanzamiento en Suiza.

## 7. Requisitos no funcionales
- Autenticación segura y autorización server-side para toda operación del panel.
- TLS/HTTPS en producción; secretos en variables de entorno; copias de seguridad.
- Imágenes responsivas y optimizadas; etiquetas alternativas y métricas de rendimiento acordadas.
- Registro de eventos relevantes, errores y cambios editoriales críticos.
- SEO técnico y sitemap; validación de idioma y atributos hreflang.
- Gestión de cookies conforme al uso real de analítica/terceros; privacidad y aviso legal revisados.

## 8. Información inicial
El cliente ya dispone de logotipo; todavía no dispone de dominio. No se mostrarán precios: el contacto comercial será por WhatsApp. El contenido de desarrollo puede ser de demostración.

## 9. Preparación para el lanzamiento
- Confirmar qué actividades del catálogo de referencia ofrece MAGIE. Las cuatro áreas iniciales están registradas en [Contenido demostrativo](sample-content.md).
- Responsables de publicación y traducción.
- Datos de contacto y WhatsApp definitivos.
- Implementar maquetas de escritorio y móvil con azul marino, blanco y acento verde petróleo. Revisar contraste y navegación con teclado.
- Contenido legal aplicable, dominio, alojamiento y respaldo.

## 10. Criterios
Ver `docs/acceptance-criteria.md`.
