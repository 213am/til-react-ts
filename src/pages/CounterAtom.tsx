import { useRecoilState, useRecoilValue } from "recoil";
import { countAtom, loginAtom } from "../atoms/countAtom";
import { countSelector } from "../selector/countSelector";

interface CounterAtomProps {
  children?: React.ReactNode;
}

const CounterAtom = (): JSX.Element => {
  const [count, setCount] = useRecoilState(countAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  // selector 사용하기
  const nowCountValue = useRecoilValue(countSelector);

  return (
    <div className="text-xl px-10 py-4">
      <h1>
        CounterAtom :{" "}
        {isLogin ? "로그인에 성공했습니다" : "로그인이 필요합니다"}
      </h1>
      <div className="flex gap-4 py-4">
        <button onClick={() => setIsLogin(true)}>로그인</button>
        <button onClick={() => setIsLogin(false)}>로그아웃</button>
      </div>
      <div className="flex w-1/3 gap-6 items-center justify-between">
        <div className="flex w-1/3 gap-4 items-center">
          <h3 className="flex w-1/3 text-red-500 text-3xl text-nowrap">
            {count}
          </h3>
          <h3 className="flex w-1/3 text-nowrap">
            {count % 2 == 0 ? "짝수" : "홀수"}
          </h3>
          <h3 className="flex w-1/3 text-nowrap">{nowCountValue}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-1 border border-black text-lg"
          >
            count 증가
          </button>
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-1 border border-black text-lg"
          >
            count 감소
          </button>
        </div>
      </div>
    </div>
  );
};
export default CounterAtom;
