/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VERCEL_ENV: "production" | "development" | "preview";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
