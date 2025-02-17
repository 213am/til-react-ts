# CRA React + TypeScript

- Vite 와는 초기 구성이 다르다
- 회사에서는 CRA 로 구성한 경우가 많다

## CRA 로 프로젝트 생성

- js 버전 마이그레이션

```bash
npm install -g create-react-app@latest
npx create-react-app .
```

- 위 과정에서 오류가 발생한다면?

```bash
$ npx create-react-app .

Creating a new React app in D:\student\21.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template...


added 1326 packages in 41s

268 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: 21@0.1.0
npm error Found: react@19.0.0
npm error node_modules/react
npm error   react@"^19.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^18.0.0" from @testing-library/react@13.4.0
npm error node_modules/@testing-library/react
npm error   @testing-library/react@"^13.0.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error C:\Users\Administrator\AppData\Local\npm-cache\_logs\2025-02-11T09_41_48_559Z-eresolve-report.txt
npm error A complete log of this run can be found in: C:\Users\Administrator\AppData\Local\npm-cache\_logs\2025-02-11T09_41_48_559Z-debug-0.log
`npm install --no-audit --save @testing-library/jest-dom@^5.14.1 @testing-library/react@^13.0.0 @testing-library/user-event@^13.2.1 web-vitals@^2.1.0` failed
```

- 해결책

```txt
해당 오류는 React 19을 설치하면서 @testing-library/react@13.4.0 패키지가 React 18을 요구하기 때문에 발생한 의존성 충돌 문제입니다.
```

- React 18로 버전 다운그레이드

```bash
npm uninstall react react-dom react-scripts
npm install react@18 react-dom@18 react-scripts
```

- 파일 정리

  - setUpTests.js 삭제
  - App.test.js 삭제
  - reportWebVitals.js 삭제
  - logo.svg 삭제

- 프로젝트 실행

```bash
npm run start
```

- typescript npm 설치

```bash
npm i @types/react @types/react-dom @types/node @types/jest
```

- tsconfig.json 파일 생성

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "strict": true,
    "allowJs": true,
    "esModuleInterop": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- /src/index.jsx 를 index.tsx 로 변경
- /src/App.jsx 를 App.tsx 로 변경

- index.tsx 최종 코드

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
```

# useState

- 마우스 커서를 올려서 추론을 확인해보는 것도 좋은 방법

```ts
// useState 사용시 가능하면 초기값을 주자
const [text, setText] = useState<string>("");
const [name, setName] = useState<string>("");
const [isLogin, setIsLogin] = useState<boolean>(false);
const [member, setMember] = useState<[]>([]);
const [info, setInfo] = useState<null>(null);
const [age, setAge] = useState<number>(0);
const [user, SetUser] = useState<{ name: string; age: number }>({
  name: "",
  age: 0,
});
const [idol, setIdol] = useState<Idol>({ name: "", age: 0 });
const [todos, setTodos] = useState<Todo[]>([]);
```

- 객체 리터럴 형태라면 interface 를 고려해보자
- 추후 interface 는 별도의 파일에서 관리하자 (export 활용)

```ts
interface Idol {
  name: string;
  age: number;
}

const [user, SetUser] = useState<{ name: string; age: number }>({
  name: "",
  age: 0,
});
const [idol, setIdol] = useState<Idol>({ name: "", age: 0 });
```

<br/>

# 컴포넌트 살펴보기

- `/src/components` 폴더 생성
- `/src/components/Title.tsx` 파일 생성

```ts
import { JSX } from "react";

// 아래 4가지 케이스가 모두 가능

const Title = () => {
  return <div>Title</div>;
};

const Title = (): JSX.Element => {
  return <div>Title</div>;
};

const Title: React.FC = () => {
  return <div>Title</div>;
};

const Title: React.FC = (): JSX.Element => {
  return <div>Title</div>;
};

export default Title;
```

- 컴포넌트 코딩 컨벤션

  - props 는 아래처럼 정의하자

  ```ts
    inteface 컴포넌트명Props{ }
  ```

- 컴포넌트의 형태는 아래처럼 정의하자

```ts
interface 컴포넌트명Props {
  children?: React.ReactNode;
}

const 컴포넌트명 = ({ 속성, 속성 }: 인터페이스명): JSX.Element => {
  return <div></div>;
};
```
