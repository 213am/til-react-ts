# Axios

```bash
npm i axios

npm i @types/axios
```

## 폴더 및 파일 구조

- `/src/apis` 폴더 생성
- `/src/apis/todos` 폴더 생성
- `/src/apis/todos/apitodos.ts` 파일 생성
  - 확장자가 tsx 가 아님
  - js 의 역할을 하는 컴포넌트라서 ts 로 생성

```ts
import axios from "axios";
const todoURL = "https://jsonplaceholder.typicode.com/todos/";

// response 를 보고 만들어주면 됨
interface ITodo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}
type TPostTodo = Omit<ITodo, "id">;

// 자료 1개 호출하여 리턴 받기
const getOneTodo = async (id: number): Promise<ITodo | null> => {
  try {
    const res = await axios.get<ITodo>(`${todoURL}${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

// 자료 여러개 호출하여 리턴 받기
const getTodos = async (): Promise<ITodo[] | null> => {
  try {
    const res = await axios.get<ITodo[]>(todoURL);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const postTodo = async ({
  userId,
  title,
  completed,
}: TPostTodo): Promise<ITodo | null> => {
  try {
    const res = await axios.post<ITodo>(todoURL, { userId, title, completed });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 자료 1개 전체를 업데이트 하기
const putTodo = async ({
  userId,
  id,
  title,
  completed,
}: ITodo): Promise<ITodo | null> => {
  try {
    const res = await axios.put<ITodo>(todoURL, {
      userId,
      id,
      title,
      completed,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 자료 1개 수정사항 업데이트 하기
const patchTodo = async ({
  userId,
  id,
  title,
  completed,
}: ITodo): Promise<ITodo | null> => {
  try {
    const res = await axios.patch<ITodo>(todoURL, {
      userId,
      id,
      title,
      completed,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 자료 1개 삭제하기
const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    const res = await axios.delete(`${todoURL}${id}
      `);
    console.log(res.data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { getOneTodo, getTodos, putTodo, patchTodo, deleteTodo };
```

## type 관련 파일은 별도로 관리하자

- `/src/types` 폴더 생성
- `/src/types/todo.ts` 파일 생성

```ts
export interface ITodo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}
```

## api 호출하는 컴포넌트 만들기

- ts 로 작성했기 때문에 작성시 `코드 힌트`가 주어져서 편리하다
- `/src/components/Todo.tsx` 파일 생성
