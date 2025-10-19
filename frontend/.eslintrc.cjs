module.exports = {
  root: true,
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'react/prop-types': 'off'
  }
};
