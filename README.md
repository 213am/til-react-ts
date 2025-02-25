# 프로젝트 생성

`npm create vite@latest .`
: react
: typescript

`npm i`

<br/>

## git 설정

- `git init`
- `git remote add origin 레포지토리url`

<br/>

## ESLint 및 Prettier 설정

`npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`

- `.prettierrc` 파일 생성

```json
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

<br/>

## .gitignore

```
# env
.env
```

## npm

```bash
npm i axios
npm i react-router-dom
npm i react-icons
npm i react-hook-form yup @hookform/resolvers
npm i react-quill
npm i quill
npm i react-calendar
npm i swiper
npm i recoil
npm i antd --save
npm i -D tailwindcss postcss autoprefixer
```

## Tailwindcss 설정

```bash
npx tailwindcss init
```

- tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
```

## Recoil 설정

```tsx
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

## `tsconfig.app.json` 을 통한 js 사용 설정

```json
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "allowJs": true,  //  추가
```

## proxy 사용 설정

- `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  // 추가
  server: {
    proxy: {
      "/api": {
        target: "URI 주소",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```
