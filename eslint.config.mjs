import nx from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.base.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            { sourceTag: 'type:domain', onlyDependOnLibsWithTags: ['type:domain', 'scope:shared'] },
            { sourceTag: 'type:application', onlyDependOnLibsWithTags: ['type:domain', 'type:application', 'scope:shared', 'scope:core'] },
            { sourceTag: 'type:infrastructure', onlyDependOnLibsWithTags: ['type:domain', 'type:application', 'scope:shared', 'scope:core'] },
            { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:domain', 'type:application', 'type:feature', 'type:ui', 'type:util', 'type:config', 'scope:shared', 'scope:core'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui', 'type:util', 'scope:shared'] },
            { sourceTag: 'scope:app', onlyDependOnLibsWithTags: ['scope:auth', 'scope:shared', 'scope:core'] },
            { sourceTag: 'scope:shared', onlyDependOnLibsWithTags: ['scope:shared'] },
            { sourceTag: 'scope:core', onlyDependOnLibsWithTags: ['scope:shared', 'scope:core', 'scope:auth'] }
          ]
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**']
  }
];
