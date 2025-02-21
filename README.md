# Recoil

```bash
npm i recoil
```

- atoms 는 저장되는 변수
- selector 는 atoms 가 변하는 것을 추적해서 atoms 의 값을 출력하는 용도
- selector 는 필수가 아니라서 사용하지 않아도 무관

## 컨벤션

### Case 1

- atom

  - `/src/atoms` 폴더 생성

- selector
  - `/src/selector` 폴더 생성

### Case 2

- atom
  - `/src/states` 폴더 생성

## 기초 코드

- `/src/atoms/countAtom.ts` 파일 생성

```ts
import { atom } from "recoil";

// App 전체에서 관리할 값
export const countAtom = atom<number>({
  key: "countAtom",
  default: 0,
});

export const loginAtom = atom<boolean>({
  key: "loginAtom",
  default: false,
});
```

- App 전체에 Recoil 접근 및 수정 적용
  - main.tsx 혹은 index.tsx 에 작성

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

## countAtom 을 사용하는 tsx 생성

- `/src/pages/CounterAtom.tsx` 파일 생성

```tsx
import { useRecoilState } from "recoil";
import { countAtom, loginAtom } from "../atoms/countAtom";

interface CounterAtomProps {
  children?: React.ReactNode;
}

const CounterAtom = (): JSX.Element => {
  const [count, setCount] = useRecoilState(countAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);

  return (
    <div className="text-xl px-10 py-4">
      <h1>
        CounterAtom :{" "}
        {isLogin ? "로그인에 성공했습니다" : "로그인이 필요합니다"}
      </h1>
      <div className="flex gap-4 py-4">
        <button onClick={() => setIsLogin(true)}>로그인</button>
        <button onClick={() => setIsLogin(false)}>로그아웃</button>
      </div>
      <div className="flex gap-6">
        <h3 className="text-red-500 text-3xl">{count}</h3>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-1 border border-black"
        >
          count 증가
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-1 border border-black"
        >
          count 감소
        </button>
      </div>
    </div>
  );
};
export default CounterAtom;
```

## 응용예제 ( Todo )

- `/src/atoms/todoListAtom.ts` 파일 생성

```ts
import { atom } from "recoil";

export interface TodoI {
  id: number;
  title: string;
  completed: boolean;
}

export const todosAtom = atom<TodoI[]>({
  key: "todosAtom",
  default: [],
});
```

- `/src/pages/TodoList.tsx` 파일 생성

```tsx
import { useRecoilState } from "recoil";
import { todosAtom } from "../atoms/todoListAtom";
import { useState } from "react";

interface TodoListProps {
  children?: React.ReactNode;
}

const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [inputText, setInputText] = useState<string>("");

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), title: inputText, completed: false },
      ]);
    }
    setInputText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos?.map(item =>
        item?.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col px-10 py-4 gap-10">
      <h1 className="text-3xl">TodoList</h1>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          className="outline"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="font-semibold bg-black text-white px-4 py-1 rounded-sm"
        >
          추가
        </button>
      </div>
      <ul className="flex flex-col gap-4">
        {todos.map(item => (
          <li key={item.id} className="flex w-1/3 items-center justify-between">
            <span className="text-xl mr-6">{item.title}</span>
            <div className="flex gap-4">
              <span
                className={`${item.completed ? "text-blue-500" : "text-red-500"} font-bold`}
              >
                {item.completed ? "완료" : "진행중"}
              </span>
              <button
                onClick={() => toggleTodo(item.id)}
                className="flex px-3 py-1 bg-blue-400 text-white font-semibold"
              >
                {item.completed ? "수정" : "완료"}
              </button>
              <button
                onClick={() => deleteTodo(item.id)}
                className="flex px-3 py-1 bg-red-400 text-white font-semibold"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

## Selector 의 이해

- atom 의 새로운 값을 자동으로 계산해서 출력
- atom 의 갱신을 위한 중복 코드를 줄여주고 여러 곳에서 사용한다
- `/src/selector/countSelector.ts` 파일 생성

```ts
import { selector } from "recoil";
import { countAtom } from "../atoms/countAtom";

export const countSelector = selector<string>({
  key: "countSelector",
  // atom 이 바뀌면 자동으로 연산한 결과를 돌려줌
  get: ({ get }) => {
    const count = get(countAtom);
    return count % 2 == 0 ? "짝수" : "홀수";
  },
});
```

- CounterAtom.tsx 에서 selector 사용

```tsx
import { useRecoilState, useRecoilValue } from "recoil";
import { countAtom, loginAtom } from "../atoms/countAtom";
import { countSelector } from "../selector/countSelector";

interface CounterAtomProps {
  children?: React.ReactNode;
}

const CounterAtom = (): JSX.Element => {
  const [count, setCount] = useRecoilState(countAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  // selector 사용하기
  const nowCountValue = useRecoilValue(countSelector);

  return (
    <div className="text-xl px-10 py-4">
      <h1>
        CounterAtom :{" "}
        {isLogin ? "로그인에 성공했습니다" : "로그인이 필요합니다"}
      </h1>
      <div className="flex gap-4 py-4">
        <button onClick={() => setIsLogin(true)}>로그인</button>
        <button onClick={() => setIsLogin(false)}>로그아웃</button>
      </div>
      <div className="flex w-1/3 gap-6 items-center justify-between">
        <div className="flex w-1/3 gap-4 items-center">
          <h3 className="flex w-1/3 text-red-500 text-3xl text-nowrap">
            {count}
          </h3>
          <h3 className="flex w-1/3 text-nowrap">
            {count % 2 == 0 ? "짝수" : "홀수"}
          </h3>
          <h3 className="flex w-1/3 text-nowrap">{nowCountValue}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-1 border border-black text-lg"
          >
            count 증가
          </button>
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-1 border border-black text-lg"
          >
            count 감소
          </button>
        </div>
      </div>
    </div>
  );
};
export default CounterAtom;
```

## todoList 에서 completed 가 true 인 목록 뽑기

- `/src/selector/todoListSelector.ts` 파일 생성
