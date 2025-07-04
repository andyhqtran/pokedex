/* eslint-disable import/no-anonymous-default-export */
/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
};
