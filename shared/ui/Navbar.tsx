import NavItem from "./NavItem";

interface NavbarProps {
  items: { path: string; label: string }[];
}

function Navbar({ items }: NavbarProps) {
  return (
    <nav className="flex space-x-4">
      {items.map((item) => (
        <NavItem key={item.path} path={item.path} label={item.label} />
      ))}
    </nav>
  );
}

export default Navbar;
