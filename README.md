# Component 의 이해

- App.tsx

```tsx
const App = () => {
  return <div>App</div>;
};
export default App;
```

- 형태 1. ( React.FunctionComponent )

```tsx
import React from "react";

const App: React.FC = () => {
  return <div>App</div>;
};
export default App;
```

- 형태 2. ( interface JSX.Element )

```tsx
const App = (): JSX.Element => {
  return <div>App</div>;
};
export default App;
```

- 형태 3.

```tsx
import React from "react";

const App: React.FC = (): JSX.Element => {
  return <div>App</div>;
};
export default App;
```

## 이 프로젝트에서는 형태 2를 사용하겠다

```tsx
const App = (): JSX.Element => {
  return <div>App</div>;
};
export default App;
```

## Props 전달하기

- `/src/components` 폴더 생성
- `/src/components/Hi.tsx` 파일 생성
- 단계 1. (props: { age: number; name: string }) 정의

```tsx
// 함수의 파라메터는 ts 에서 타입 지정이 필요
const Hi = (props: { age: number; name: string }): JSX.Element => {
  return (
    <div>
      Hi {props.age}
      {props.name}
    </div>
  );
};
export default Hi;
```

- 단계 2. ( interface 로 props 정의 )

```tsx
interface HiProps {
  age: number;
  name: string;
}

const Hi = (props: HiProps): JSX.Element => {
  return (
    <div>
      Hi {props.age}
      {props.name}
    </div>
  );
};
export default Hi;
```

- 단계 3. ( props 구조 분해 할당 )

```tsx
interface HiProps {
  age: number;
  name: string;
}

const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age}
      {name}
    </div>
  );
};
export default Hi;
```

- 단계 4. ( props 의 children )

```tsx
interface HiProps {
  age: number;
  name: string;
  children?: React.ReactNode;
}

const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age}
      {name}
    </div>
  );
};
export default Hi;
```

<br/>

## Props 로 useState 변수 전달하기

- App.tsx ( 일반변수, state, children 을 전달하는 상황 )

```tsx
import { useState } from "react";
import Hi from "./components/Hi";

const App = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      App
      <Hi age={10} name="홍길동" count={count} setCount={setCount}>
        <p>안녕하세요</p>
      </Hi>
    </div>
  );
};
export default App;
```

- count 와 setCount 가 현재 컴포넌트에 정의가 안됨
- interface Hiprops 의 조건에 맞지 않다(형태가 맞지 않다)

```tsx
import { Dispatch, SetStateAction } from "react";

interface HiProps {
  age: number;
  name: string;
  children?: React.ReactNode;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age}
      {name}
    </div>
  );
};
export default Hi;
```

- set 류의 useState 를 직접 전달하는 것은

## Props 로 함수를 전달하기

```tsx
import { useState } from "react";
import Hi from "./components/Hi";

const App = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);

  const add = (): void => {
    const temp = count + 1;
    setCount(temp);
  };

  const minus = (num: number): void => {
    const temp = count - num;
    setCount(temp);
  };

  return (
    <div>
      App
      <Hi
        age={10}
        name="홍길동"
        count={count}
        setCount={setCount}
        add={add}
        minus={minus}
      >
        <p>안녕하세요</p>
      </Hi>
    </div>
  );
};
export default App;
```

```tsx
import { Dispatch, SetStateAction } from "react";

interface HiProps {
  age: number;
  name: string;
  children?: React.ReactNode;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  add: () => void;
  minus: (num: number) => void;
}

const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age}
      {name}
    </div>
  );
};
export default Hi;
```
