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
