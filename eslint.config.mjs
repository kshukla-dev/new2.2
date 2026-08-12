// Flat ESLint config for Next.js 16.
// eslint-config-next 16 ships native flat-config arrays, so we spread them
// directly (no FlatCompat — that combination crashes the config validator).
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    // This codebase intentionally uses `any` for CMS/JSON data shapes
    // (Sanity documents, imported *.json), so don't fail lint on it.
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]

export default eslintConfig
