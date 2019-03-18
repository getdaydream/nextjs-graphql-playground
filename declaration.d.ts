/// <reference types="daydream" />

// TODO: make this work
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
