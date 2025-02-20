import React from "react";
import { useParams } from "react-router-dom";

interface DetailProps {
  children?: React.ReactNode;
  title: string;
}
// const Detail: React.FC<DetailProps> = ({ title }) => {
//     return <div>Detail</div>;
//   };

const Detail = ({ title }: DetailProps): JSX.Element => {
  const { id } = useParams();

  return (
    <div>
      {title}의 제품 {id}번 상세 정보
    </div>
  );
};

export default Detail;
