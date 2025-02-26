import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  path: string;
  label: string;
}

function NavItem({ path, label }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path; // 현재 경로 확인

  return (
    <Link
      to={path}
      className={`pb-2 border-b-3 text-gray-800 hover:underline ${
        isActive ? "border-gray-800 font-bold" : "border-transparent"
      }`}
    >
      {label}
    </Link>
  );
}

export default NavItem;