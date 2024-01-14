const typescriptOverride = require('@programic/eslint-plugin/lib/configs/typescript-override');

const tsConfigPath = 'tsconfig.vitest.json';
const tailwindConfigPath = 'tailwind.config.cjs';

const defaultTypescriptOverride = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'vitest',
  ],
  extends: [
    ...typescriptOverride.extends,
    'plugin:vitest/recommended',
  ],
};

const namingConventionsTestFileRule = [
  ...typescriptOverride.rules['@typescript-eslint/naming-convention'],
];

const variableIndex = namingConventionsTestFileRule.findIndex(selector => {
  return typeof selector === 'object' && selector.selector === 'variable';
});

if (variableIndex > -1) {
  namingConventionsTestFileRule.splice(variableIndex, 1, {
    selector: 'variable',
    format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
  });
}

const testOverrideRules = {
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@programic/typescript-explicit-module-boundary-types': 'off',
  '@programic/typescript-explicit-function-return-type': 'off',
};

/** @type {import('eslint').Config} */
module.exports = {
  env: {
    node: true,
  },
  plugins: [
    '@programic',
    'vitest',
  ],
  extends: [
    'plugin:@programic/tailwindcss',
    'plugin:@programic/vue-typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: tsConfigPath,
      },
    },
    tailwindcss: {
      config: tailwindConfigPath,
    },
    programic: {
      vue: {
        extendedComputedProperties: {
          vueuse: [
            'computedAsync',
            'computedEager',
            'computedInject',
            'computedWithControl',
            'reactiveComputed',
          ],
        },
        extendedWatchers: {
          vueuse: [
            'until',
            'watchArray',
            'watchAtMost',
            'watchDebounced',
            'watchDeep',
            'watchIgnorable',
            'watchImmediate',
            'watchOnce',
            'watchPausable',
            'watchThrottled',
            'watchTriggerable',
            'watchWithFilter',
            'whenever',
          ],
        },
        extendedHooks: {
          'vue-router': [
            'onBeforeRouteLeave',
            'onBeforeRouteUpdate',
          ],
        },
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    project: tsConfigPath,
  },
  overrides: [
    {
      ...defaultTypescriptOverride,
      files: ['**/*.spec.ts'],
      rules: {
        ...typescriptOverride.rules,
        ...testOverrideRules,
        'no-promise-executor-return': 'off',
        '@typescript-eslint/naming-convention': namingConventionsTestFileRule,
        'unicorn/prevent-abbreviations': ['error', {
          checkShorthandProperties: true,
          checkProperties: true,
          ignore: [
            /^src$/i,
            // Vue specific ignores
            /attrs|params|prop|props|ref|refs/i,
          ],
        }],
        'vue/one-component-per-file': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        'vitest/consistent-test-it': 'error',
        'vitest/no-alias-methods': 'error',
        'vitest/no-conditional-expect': 'error',
        'vitest/no-conditional-in-test': 'error',
        'vitest/no-conditional-tests': 'error',
        'vitest/no-disabled-tests': 'error',
        'vitest/no-done-callback': 'error',
        'vitest/no-duplicate-hooks': 'error',
        'vitest/no-focused-tests': 'error',
        'vitest/no-standalone-expect': 'error',
        'vitest/no-test-return-statement': 'error',
        'vitest/prefer-called-with': 'error',
        'vitest/prefer-lowercase-title': 'error',
        'vitest/prefer-strict-equal': 'error',
        'vitest/prefer-to-be-object': 'error',
        'vitest/prefer-to-have-length': 'error',
      },
    },
    {
      ...defaultTypescriptOverride,
      files: ['**/*.stories.ts'],
      rules: {
        ...typescriptOverride.rules,
        'unicorn/prevent-abbreviations': ['error', {
          checkShorthandProperties: true,
          checkProperties: true,
          ignore: [
            /^src$/i,
            // Vue specific ignores
            /arg/i,
          ],
        }],
      },
    },
    {
      ...defaultTypescriptOverride,
      files: ['**/__mocks__/*.ts', '**/mocks/**/*.ts'],
      rules: {
        ...typescriptOverride.rules,
        ...testOverrideRules,
      },
    }
  ],
  rules: {
    'id-length': ['error', {
      min: 2,
      properties: 'always',
      exceptions: ['t', 'rt', 'd', 'n', 'te', 'tm'],
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ["**/tests/**", "**/__tests__/**"],
    }],
    'tailwindcss/no-custom-classname': ['error', {
      whitelist: ['^app-.+$', 'stroke-3'],
    }],
    'vitest/consistent-test-filename': ['error', {
      pattern: '.*\\.spec\\.[tj]sx?$',
      allTestPattern: '.*\\.(test|spec)\\.[tj]sx?$',
    }],
    '@typescript-eslint/no-floating-promises': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'import/no-cycle': 'off',
  },
};
