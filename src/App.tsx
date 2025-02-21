import CounterAtom from "./pages/CounterAtom";
import TodoList from "./pages/TodoList";

const App = (): JSX.Element => {
  return (
    <div>
      <CounterAtom />
      <TodoList />
    </div>
  );
};
export default App;
