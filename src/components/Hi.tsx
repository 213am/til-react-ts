import { Dispatch, SetStateAction } from "react";

interface HiProps {
  age: number;
  name: string;
  children?: React.ReactNode;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  add: () => void;
  minus: (num: number) => void;
}

const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age}
      {name}
    </div>
  );
};
export default Hi;
