import { selector } from "recoil";
import { TodoI, todosAtom } from "../atoms/todoListAtom";

export const todoListSelector = selector<TodoI[]>({
  key: "todoListSelector",
  get: ({ get }) => {
    const todos = get(todosAtom);
    return todos.filter(item => item.completed === true);
  },
});
