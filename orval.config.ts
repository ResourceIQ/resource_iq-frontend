import { defineConfig } from 'orval';

export default defineConfig({
  "resource-iq": {
    input: 'http://127.0.0.1:8000/api/v1/openapi.json',
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'src/api/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/lib/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },
});