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
