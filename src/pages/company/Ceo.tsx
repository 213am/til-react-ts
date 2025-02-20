import { useLocation, useSearchParams } from "react-router-dom";

const Ceo = (): JSX.Element => {
  // 현재 URI 의 주소 및 패스 알아내기
  const location = useLocation();
  console.log(location.pathname);
  console.log(location.search);
  console.log(location?.state);

  //  쿼리스트링에서 갑을 추출
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  return (
    <h3>
      {name}님의 소개 : {age} 세
    </h3>
  );
};
export default Ceo;
