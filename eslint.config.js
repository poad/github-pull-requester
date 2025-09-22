// @ts-check
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import github from 'eslint-plugin-github';
import { configs } from 'typescript-eslint';
export default defineConfig(eslint.configs.recommended, ...configs.strict, ...configs.stylistic, {
    ignores: [
        '**/*.d.ts',
        '*.{js,jsx}',
        'node_modules/**/*',
        'dist',
    ],
    files: ['{src,test}/**/*.ts'],
    extends: [
        ...configs.recommended,
    ],
    plugins: {
        '@stylistic': stylistic,
        github,
    },
    rules: {
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/indent': ['error', 2],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/quotes': ['error', 'single'],
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNsaW50LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVzbGludC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTtBQUVaLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0sWUFBWSxDQUFDO0FBQ2hDLE9BQU8sU0FBUyxNQUFNLDBCQUEwQixDQUFDO0FBR2pELE9BQU8sTUFBTSxNQUFNLHNCQUFzQixDQUFDO0FBRTFDLE9BQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsZUFBZSxZQUFZLENBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUMxQixHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQ2pCLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFDcEI7SUFDRSxPQUFPLEVBQUU7UUFDUCxXQUFXO1FBQ1gsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixNQUFNO0tBQ1A7SUFDRCxLQUFLLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUM3QixPQUFPLEVBQUU7UUFDUCxHQUFHLE9BQU8sQ0FBQyxXQUFXO0tBQ3ZCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLFNBQVM7UUFDdkIsTUFBTTtLQUNQO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQ3RDLG1CQUFtQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNqQyx5QkFBeUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQztRQUN4RCxtQkFBbUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7S0FDekM7Q0FDRixDQUNGLENBQUMifQ==