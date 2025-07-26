// env.config.ts
export const environments = {
  dev: {
    baseUrl: 'http://localhost:8000',
  },
  qa: {
    baseUrl: 'https://qa.example.com',
  },
  prod: {
    baseUrl: 'https://api.example.com',
  },
};

// Read from CLI or fallback to dev
const currentEnv = process.env.ENV || 'dev';

export const config = environments[currentEnv as keyof typeof environments];
