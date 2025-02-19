import { useState } from "react";
import Hi from "./components/Hi";
import Todo from "./components/Todo";

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
      <Todo />
    </div>
  );
};
export default App;
