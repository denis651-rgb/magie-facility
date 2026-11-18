# Idiomas del sitio público

El sitio admite español (`es`), alemán (`de`), francés (`fr`) e italiano (`it`). El panel de administración conserva su interfaz en español.

## Cómo añadir una traducción

1. Abre la página o servicio existente desde el administrador.
2. Cambia el idioma del contenido con el selector del panel.
3. Completa el título, el contenido y los textos opcionales en ese idioma. El identificador se genera al introducir el título.
4. Revisa y publica. No crees otro documento para traducir el mismo contenido.
5. En «Menú del sitio», puedes completar una etiqueta distinta para cada idioma. Si está vacía, se utiliza el título traducido de la página o el texto estándar del enlace.

Los campos compartidos, como las imágenes y el número de WhatsApp, pertenecen al mismo documento. Los textos localizados se guardan por separado. La publicación conserva el estado editorial común de Payload. Revisa los cambios pendientes de todos los idiomas antes de publicar.

## Comportamiento público

- El selector muestra ES, DE, FR e IT. En páginas y servicios personalizados, busca las traducciones del mismo documento usando sus identificadores propios.
- Una traducción sin título o identificador queda desactivada en el selector y no aparece en el menú ni en el catálogo del idioma correspondiente. No se sustituye por contenido español.
- Una dirección de contenido inexistente devuelve 404. Los borradores no aparecen en las consultas públicas.
- Los textos de interfaz, botones, catálogo, contacto, pie de página y asistente de WhatsApp tienen traducciones incluidas. Los textos que escribe la empresa no se traducen automáticamente.
- Los catálogos usan `/es/servicios`, `/de/dienstleistungen`, `/fr/services` y `/it/servizi`. Cuando existe una página de Servicios configurada y traducida en el menú, se utiliza esa página y el botón de regreso de cada ficha apunta a ella.
- Las páginas CMS conservan `/[idioma]/paginas/[identificador]`. Las fichas utilizan `/[idioma]/[segmento-del-catálogo]/[identificador]`.
- El atributo HTML `lang` corresponde al idioma solicitado, también al navegar con el selector.

## Verificación realizada

Compilación de producción y comprobación TypeScript. Pruebas en Chrome con una página y un servicio temporales traducidos a los cuatro idiomas: cambio entre documentos equivalentes, fichas, enlaces de regreso, catálogos, widget de WhatsApp, rutas inexistentes, borradores y ausencia de desbordamiento a 375, 768 y 1440 píxeles. Los registros de prueba se eliminaron al terminar.

La configuración base del CMS y la migración de los idiomas francés e italiano están incluidas. Al instalar esta versión en otro servidor se deben aplicar las migraciones pendientes antes de iniciar la aplicación. Las traducciones empresariales y la revisión de su calidad siguen siendo tareas de contenido.
