import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: ['error', 'always'], // 세미콜론 추가
      quotes: ['error', 'double'], // 더블 따옴표 사용
      'no-unused-vars': 'warn', // 사용되지 않는 변수 경고
      'react/react-in-jsx-scope': 'off', // React JSX scope 관련 경고 끄기
      '@typescript-eslint/no-explicit-any': 'off', // `any` 타입 사용 허용
      'react/prop-types': 'off', // prop-types 사용하지 않기
      '@typescript-eslint/no-unused-vars': 'warn', // 사용되지 않는 변수 경고
      'react/no-unused-state': 'error', // 사용되지 않는 state는 에러
      'array-callback-return': 'off', // array-callback-return 규칙 끄기
      'react/self-closing-comp': 'warn', // self-closing tag에 대한 경고
      '@typescript-eslint/ban-ts-comment': 'off', // ts-comment 관련 규칙 끄기
    },
  },
)
