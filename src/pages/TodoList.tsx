import { useRecoilState, useRecoilValue } from "recoil";
import { todosAtom } from "../atoms/todoListAtom";
import { useState } from "react";
import { todoListSelector } from "../selector/todoListSelector";

interface TodoListProps {
  children?: React.ReactNode;
}

const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [inputText, setInputText] = useState<string>("");
  const completedTodos = useRecoilValue(todoListSelector);

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
    <>
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
            <li
              key={item.id}
              className="flex w-1/3 items-center justify-between"
            >
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
      <div className="flex flex-col px-10 py-4 text-xl gap-2">
        <h2>- 완료된 목록 - </h2>
        <ul>
          {completedTodos.map(item => (
            <li
              key={item.id}
              className="flex w-1/4 items-center justify-between"
            >
              <span className="text-xl mr-6">{item.title}</span>
              <span>할일 완료</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
