import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-20 py-5 bg-cyan-500 text-zinc-100 fixed z-50 w-full">
      <h3>{import.meta.env.VITE_PRODUCT_NAME}</h3>
      <div className="w-1/4 flex justify-between mr-20">
        <Link to={"/"}>Halaman Utama</Link>
        <Link to={"/profil"}>Profil</Link>
        <Link to={"/tentang"}>Tentang</Link>
      </div>
    </div>
  );
};

export default Navbar;
