import * as migration_20261116_013605_initial_users from './20261116_013605_initial_users';
import * as migration_20261116_013801_initial_content from './20261116_013801_initial_content';
import * as migration_20261116_020147_company_social_links from './20261116_020147_company_social_links';
import * as migration_20261117_141151_external_media from './20261117_141151_external_media';
import * as migration_20261117_193737_editable_pages_menu from './20261117_193737_editable_pages_menu';
import * as migration_20261117_195248_homepage from './20261117_195248_homepage';
import * as migration_20261117_200927_page_service_catalog from './20261117_200927_page_service_catalog';
import * as migration_20261118_011121_about_page_design from './20261118_011121_about_page_design';
import * as migration_20261118_020558_whatsapp_widget_text from './20261118_020558_whatsapp_widget_text';
import * as migration_20261118_034714_french_italian_locales from './20261118_034714_french_italian_locales';

export const migrations = [
  {
    up: migration_20261116_013605_initial_users.up,
    down: migration_20261116_013605_initial_users.down,
    name: '20261116_013605_initial_users',
  },
  {
    up: migration_20261116_013801_initial_content.up,
    down: migration_20261116_013801_initial_content.down,
    name: '20261116_013801_initial_content',
  },
  {
    up: migration_20261116_020147_company_social_links.up,
    down: migration_20261116_020147_company_social_links.down,
    name: '20261116_020147_company_social_links',
  },
  {
    up: migration_20261117_141151_external_media.up,
    down: migration_20261117_141151_external_media.down,
    name: '20261117_141151_external_media',
  },
  {
    up: migration_20261117_193737_editable_pages_menu.up,
    down: migration_20261117_193737_editable_pages_menu.down,
    name: '20261117_193737_editable_pages_menu',
  },
  {
    up: migration_20261117_195248_homepage.up,
    down: migration_20261117_195248_homepage.down,
    name: '20261117_195248_homepage',
  },
  {
    up: migration_20261117_200927_page_service_catalog.up,
    down: migration_20261117_200927_page_service_catalog.down,
    name: '20261117_200927_page_service_catalog',
  },
  {
    up: migration_20261118_011121_about_page_design.up,
    down: migration_20261118_011121_about_page_design.down,
    name: '20261118_011121_about_page_design',
  },
  {
    up: migration_20261118_020558_whatsapp_widget_text.up,
    down: migration_20261118_020558_whatsapp_widget_text.down,
    name: '20261118_020558_whatsapp_widget_text',
  },
  {
    up: migration_20261118_034714_french_italian_locales.up,
    down: migration_20261118_034714_french_italian_locales.down,
    name: '20261118_034714_french_italian_locales'
  },
];
