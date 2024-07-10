/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string,
  readonly VITE_FUDIBOT_API: string,
  readonly VITE_AUTH0_CLIENTID: string,
  readonly VITE_AUTH0_SECRET: string,
  readonly VITE_GOOGLE_ID: string, 
  readonly VITE_GOOGLE_SECRET: string,
  readonly VITE_GOOGLE_MAPS: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}