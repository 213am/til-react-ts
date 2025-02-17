import { useEffect, useRef, useState } from "react";
import { Todo } from "./types";
import Add from "./components/Add";

const App = () => {
  // useState 사용시 가능하면 초기값을 주자
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  // useRef 로 변수 보관하기
  const idCount = useRef(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAdd = () => {
    console.log(text);
    const tempTodo: Todo = {
      id: idCount.current++,
      title: text,
      content: "",
      completed: false,
    };
    setTodos([...todos, tempTodo]);
    setText("");
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // 할일을 추가해주는 함수
  const addTodo = (text: string): void => {
    console.log("할일 추가", text);
  };

  return (
    <div>
      <h1>Todo Service</h1>
      <div>
        <Add addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
