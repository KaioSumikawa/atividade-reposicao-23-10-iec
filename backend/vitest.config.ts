import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      // Define o provedor de cobertura
      provider: 'v8',

      // Diretório onde os relatórios serão salvos
      reportsDirectory: './coverage',

      // Formatos dos relatórios, incluindo LCOV para o SonarCloud
      reporter: ['text', 'html', 'lcov'],

      // Arquivos incluídos na análise de cobertura
      include: ['src/**/*.ts'],

      // Arquivos desconsiderados
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/types/**',
        'src/server.ts',
        'src/migrations/**',
      ],

      // Limites mínimos de cobertura
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});