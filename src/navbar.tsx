import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 bg-cyan-500 text-zinc-100 fixed z-50 w-full">
      {import.meta.env.VITE_PRODUCT_NAME}
      <Link to={"/"}>Home</Link>
      <Link to={"/"}>Home</Link>
      <Link to={"/"}>Home</Link>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Navbar;
