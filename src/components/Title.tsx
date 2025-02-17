import React, { JSX } from "react";

// const Title = () => {
//   return <div>Title</div>;
// };

/**
 * React.FC 는 React.FunctionComponent
 * - 자동으로 children 속성을 제공
 * - children 이 필요하지 않아도 제공된다
 */
interface TitleProps {
  age: number;
  job: string;
  children?: React.ReactNode;
}
// const Title: React.FC<TitleProps> = ({ age, job, children }) => {
//   return (
//     <div>
//       Title{job}
//       {age}
//       {children}
//     </div>
//   );
// };

/**
 * JSX.Element
 * - 자동으로 children 속성을 제공하지 않는다.
 * - 직접 관리해야 한다.
 */
const Title = ({ age, job, children }: TitleProps): JSX.Element => {
  return (
    <div>
      Title{job}
      {age}
      {children}
    </div>
  );
};

// const Title: React.FC = (props: TitleProps): JSX.Element => {
//   return <div>Title</div>;
// };

export default Title;
