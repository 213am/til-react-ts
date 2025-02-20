import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Index";
import Company from "./pages/company/Index";
import Ceo from "./pages/company/Ceo";
import History from "./pages/company/History";
import Partnership from "./pages/company/Partnership";
import Location from "./pages/company/Location";
import Goods from "./pages/goods/Goods";
import Detail from "./pages/goods/Detail";
import Header from "./components/Header";
import { useState } from "react";

// 협력사 타입
export interface IPartner {
  name: string;
  link: string;
}

function App(): JSX.Element {
  const partnerList: IPartner[] = [
    { name: "삼성", link: "http://" },
    { name: "LG", link: "http://" },
    { name: "애플", link: "http://" },
  ];

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className="wrap">
        <Header>
          {isLogin ? (
            <div className="flex gap-4">
              <button>정보수정</button>
              <button>로그아웃</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button>회원가입</button>
              <button>로그인</button>
            </div>
          )}
        </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company">
            <Route index element={<Company />} />
            <Route path="ceo" element={<Ceo />} />
            <Route
              path="history"
              element={<History title={"좋은회사"} year={1990} />}
            />
            <Route
              path="partnership"
              element={<Partnership partnerList={partnerList} />}
            />
            <Route path="location" element={<Location />} />
          </Route>
          <Route path="/goods">
            <Route index element={<Goods />} />
            <Route path=":id" element={<Detail title={"좋은회사"} />} />
            <Route path="delete:id" element={<h1>제품 삭제 페이지</h1>} />
            <Route path="modified:id" element={<h1>제품 수정 페이지</h1>} />
          </Route>
        </Routes>
        <footer>하단</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
