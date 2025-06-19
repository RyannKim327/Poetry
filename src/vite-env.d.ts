/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GIST_TOKEN
    readonly VITE_GIST_ID
    readonly VITE_GIST_FILE
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}