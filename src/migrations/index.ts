import * as migration_20261116_013605_initial_users from './20261116_013605_initial_users';
import * as migration_20261116_013801_initial_content from './20261116_013801_initial_content';

export const migrations = [
  {
    up: migration_20261116_013605_initial_users.up,
    down: migration_20261116_013605_initial_users.down,
    name: '20261116_013605_initial_users',
  },
  {
    up: migration_20261116_013801_initial_content.up,
    down: migration_20261116_013801_initial_content.down,
    name: '20261116_013801_initial_content'
  },
];
