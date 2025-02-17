import React, { JSX, useRef, useState } from "react";
import { Todo } from "../types";

interface AddProps {
  children?: React.ReactNode;
  addTodo: (text: string) => void;
}

const Add = ({ addTodo }: AddProps): JSX.Element => {
  const [text, setText] = useState<string>("");

  // React (typescript) 에서 자주 나오는 이벤트
  // 요령은 html 태그에 마우스 올려서 확인하기
  // onChange 이벤트 (e: React.ChangeEvent<HTMLInputElement>)
  // onSubmit 이벤트 (e: React.FormEvent<HTMLFormElement>)
  // onClick 이벤트 (e: React.MouseEvent<HTMLButtonElement>)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    addTodo(e.target.value);
  };

  const handleAdd = () => {
    console.log(text);
  };

  return (
    <>
      <input type="text" value={text} onChange={(e) => handleChange(e)} />
      <button onClick={handleAdd}>할일 등록</button>
    </>
  );
};
export default Add;
