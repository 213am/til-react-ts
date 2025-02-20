import {
  createSearchParams,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

interface IQueryData {
  name: string;
  age: number;
}

interface IHiddenInfo {
  memo: string;
  watch: string;
  favorite: string;
}

const Goods = (): JSX.Element => {
  // router 주소를 전달해서 이동
  const navigate = useNavigate();

  // 1. 많은 사람들이 아래처럼 주소 및 쿼리 스트링을 만든다
  const normalUrl = () => {
    const url = `/company/ceo?name=hong&age=30`;
    navigate(url);
  };

  // 2. 문법을 좋아하는 사람들은 아래처럼
  const specialUrl = () => {
    // 전송할 데이터
    const queryData: IQueryData = {
      name: "hong",
      age: 20,
    };
    // 데이터를 직렬화( 문자열로 변환 ) 한다
    const quertStr = createSearchParams({
      ...queryData,
      age: queryData.age.toString(),
    }).toString();
    // 몰래 보내는 정보도 담을 수 있어요
    const fromUrl: IHiddenInfo = {
      memo: "제품 페이지에서 왔어요",
      watch: "제품 1을 보고 있었어요",
      favorite: "제품 1과 제품 2에 관심을 가진 사용자예요",
    };

    navigate(
      {
        pathname: "/company/ceo",
        search: quertStr,
      },
      { state: fromUrl },
    );
  };

  return (
    <div className="flex  flex-col px-6 gap-10">
      <h1 className="text-xl mb-2">제품소개</h1>
      {/* Navigate */}
      <div>
        <button
          onClick={normalUrl}
          className="px-2 py-1 bg-slate-500 text-white font-semibold rounded-sm"
        >
          navigate 로 이동하기
        </button>
      </div>
      <div>
        <button
          onClick={specialUrl}
          className="px-2 py-1 bg-slate-500 text-white font-semibold rounded-sm"
        >
          추천하는 이동하기
        </button>
      </div>
      {/* Link */}
      <div className="flex gap-4">
        <Link
          to={"/goods/1"}
          className="px-2 py-1 bg-blue-400 text-white font-semibold rounded-sm"
        >
          제품 1번
        </Link>
        <Link
          to={"/goods/delete/1"}
          className="px-2 py-1 bg-red-400 text-white font-semibold rounded-sm"
        >
          제품 삭제
        </Link>
        <Link
          to={"/goods/modified/1"}
          className="px-2 py-1 bg-green-400 text-white font-semibold rounded-sm"
        >
          제품 수정
        </Link>
      </div>
      {/*  */}
      <div>
        <h2 className="border px-4 py-2">레이아웃 유지하고 화면 출력하기</h2>
        <Outlet />
      </div>
    </div>
  );
};
export default Goods;
