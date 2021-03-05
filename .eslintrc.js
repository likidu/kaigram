module.exports = {
    env: {
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        // ecmaVersion: 12,
        // sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    settings: {
        react: {
            pragma: 'h',
            version: 'detect',
        },
    },
    rules: {
        'react/no-unknown-property': ['error', { ignore: ['class'] }],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
    },
}
