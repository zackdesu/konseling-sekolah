import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRef, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  document.addEventListener("click", (e) => {
    const button = buttonRef.current;
    if (!button) return;
    const svgbutton = button.childNodes[0];
    const pathfill = svgbutton.childNodes[0];

    if (e.target === button || e.target === svgbutton || e.target === pathfill)
      return;
    else setOpen(false);
  });

  return (
    <>
      <div className="flex items-center justify-between px-3 md:px-20 py-5 bg-cyan-500 text-zinc-100 fixed z-50 w-full top-0 border-b-2 border-cyan-200">
        <h3>
          <Link to={"/"}>{import.meta.env.VITE_PRODUCT_NAME}</Link>
        </h3>
        <div
          className={`absolute top-[110%] right-8 max-md:border-2 max-md:bg-zinc-100 max-md:rounded-lg p-2 max-md:text-zinc-900 flex-col md:flex md:w-1/2 xl:w-1/4 md:flex-row md:static justify-between md:mr-20 ${
            open ? "flex" : "hidden"
          }`}
        >
          <Link className="max-md:my-1" to={"/"}>
            Halaman Utama
          </Link>
          <Link className="max-md:my-1" to={"/profil"}>
            Profil
          </Link>
          <Link className="max-md:my-1" to={"/tentang"}>
            Tentang
          </Link>
        </div>
        <button
          className="mr-5 md:hidden"
          onClick={() => setOpen(!open)}
          ref={buttonRef}
        >
          <RxHamburgerMenu size={30} />
        </button>
      </div>
    </>
  );
};

export default Navbar;
