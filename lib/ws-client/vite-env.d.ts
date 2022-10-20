/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENV: "production" | "development" | "preview";
  readonly VITE_VERCEL_ENV: "production" | "development" | "preview";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
