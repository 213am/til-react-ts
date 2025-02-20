# router

- 설치

```bash
npm install react-router-dom
npm i @types/react-router-dom
```

- App.tsx

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="wrap">
        <header>상단메뉴</header>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}></Route>
        </Routes>
        <footer>하단</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- App.tsx 현재 코드

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Index";
import Company from "./pages/company/Index";
import Ceo from "./pages/company/Ceo";
import History from "./pages/company/History";
import Partner from "./pages/company/Partner";
import Location from "./pages/company/Location";
import Good from "./pages/good/Good";
import OCRUploader from "./pages/company/Test";

// 협력사 타입
export interface PartnerType {
  name: string;
  link: string;
}

function App(): JSX.Element {
  const partnerList: PartnerType[] = [
    { name: "삼성", link: "http://" },
    { name: "LG", link: "http://" },
    { name: "그린컴퓨터", link: "http://" },
  ];
  return (
    <BrowserRouter>
      <div className="wrap">
        <header>상단메뉴</header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company">
            <Route index element={<Company />} />
            <Route path="ceo" element={<Ceo />} />
            <Route
              path="history"
              element={<History title="좋은회사" year={1990} />}
            />
            <Route
              path="partner"
              element={<Partner partnerList={partnerList} />}
            />
            <Route path="location" element={<Location />} />
          </Route>
          <Route path="/good" element={<Good />} />
        </Routes>
        <footer>하단</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- /src/pages/Index.tsx

```tsx
const Index = (): JSX.Element => {
  return <h1>홈페이지</h1>;
};

export default Index;
```

- /src/pages/company/Index.tsx

```tsx
const Index = (): JSX.Element => {
  return <div>회사소개</div>;
};

export default Index;
```

- /src/pages/company/Ceo.tsx
- http://localhost:5173/company/ceo?name=Kim&age=30

```tsx
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
```

- /src/pages/company/History.tsx

```tsx
interface HistoryProps {
  children?: React.ReactNode;
  title: string;
  year: number;
}

const History = ({ title, year }: HistoryProps): JSX.Element => {
  return (
    <div>
      History {title} {year}
    </div>
  );
};

export default History;
```

- /src/pages/company/Partner.tsx

```tsx
import React from "react";
import { IPartner } from "../../App";

interface PartnerProps {
  children?: React.ReactNode;
  partnerList: IPartner[];
}

const Partnership: React.FC<PartnerProps> = ({ partnerList }) => {
  return (
    <div className="p-6">
      <p className="text-2xl mb-6">Partnership</p>
      <ul>
        {partnerList?.map((item, index) => (
          <li key={index} className="flex w-full gap-4 text-lg py-1">
            <span>{item.name}</span>
            <span>{item.link}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Partnership;
```

- /src/pages/company/Location.tsx

```tsx
const Location = (): JSX.Element => {
  return <div>Location</div>;
};

export default Location;
```

- /src/pages/goods/Goods.tsx

```tsx
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
    <div className="flex  flex-col p-6 gap-10">
      <h1 className="text-3xl mb-4">제품소개</h1>
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
```

- App.tsx

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Index";
import Company from "./pages/company/Index";
import Ceo from "./pages/company/Ceo";
import History from "./pages/company/History";
import Partnership from "./pages/company/Partnership";
import Location from "./pages/company/Location";
import Goods from "./pages/goods/Goods";
import Detail from "./pages/goods/Detail";

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

  return (
    <BrowserRouter>
      <div className="wrap">
        <header>상단메뉴</header>
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
```

- /src/pages/goods/Detail.tsx

```tsx
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
```

- /src/components/Header.tsx
- NavLink 활용 예시

```tsx
import { NavLink } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <div className="p-2 text-xl">
      Header
      <div className="px-4 py-10 text-xl font-semibold">
        <ul className="flex gap-4">
          <li className="flex gap-4">
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/"
            >
              홈
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/goods"
            >
              제품
            </NavLink>
          </li>
          <li>{children}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```
