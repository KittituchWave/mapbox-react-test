/// <reference types="node" />

declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly PUBLIC_URL: string;
      readonly REACT_APP_MAPBOX_ACCESS_TOKEN: string;
      // Add more environment variables as needed
    }
  }
  