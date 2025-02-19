import axios from "axios";
import { ITodo } from "../../types/todo";
const todoURL = "https://jsonplaceholder.typicode.com/todos/";

// response 를 보고 만들어주면 됨

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
