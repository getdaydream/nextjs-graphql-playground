/// <reference types="node" />

// // TODO: make this work
// declare global {
//   namespace NodeJS {
//     // TODO: make this work
//     interface Process {
//       browser: boolean;
//     }

//     interface ProcessEnv {
//       GITHUB_AUTH_TOKEN: string;
//       NODE_ENV: 'development' | 'production';
//     }
//   }
// }

declare interface Process {
  browser: boolean;
}

declare module '*.css';
