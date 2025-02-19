import { MouseEvent, ReactNode, useState } from "react";
import { getOneTodo, getTodos } from "../apis/todos/apitodos";
import { ITodo } from "../types/todo";

interface TodoProps {
  children?: ReactNode;
}

const Todo = (props: TodoProps): JSX.Element => {
  const [todo, setTodo] = useState<ITodo | null>(null);
  const [todoList, setTodoList] = useState<ITodo[]>();

  const oneTodo = async () => {
    const data = await getOneTodo(3);
    if (data) {
      console.log(data);
      setTodo(data);
      setTodoList([]);
    } else {
      console.log("데이터가 없어요");
    }
  };

  const allTodo = async () => {
    const data = await getTodos();
    if (data) {
      console.log(data);
      setTodoList(data);
      setTodo(null);
    } else {
      console.log("데이터가 없어요");
    }
  };

  return (
    <div className="flex w-full gap-4">
      <button onClick={oneTodo}>하나만 가져오기</button>
      <button onClick={allTodo}>전체목록 가져오기</button>
      <button>추가하기</button>
      <button>전체 수정하기</button>
      <button>일부 수정하기</button>
      <button>삭제하기</button>
      <br /> <br />
      {todo && (
        <div className="flex gap-4">
          <span>{todo.title}</span>
          <span>{todo.completed ? "완료" : "진행중"}</span>
        </div>
      )}
      {todoList?.map(data => (
        <div key={data.id} className="flex gap-4">
          <span>{data.title}</span>
          <span>{data.completed ? "완료" : "진행중"}</span>
        </div>
      ))}
    </div>
  );
};

export default Todo;
