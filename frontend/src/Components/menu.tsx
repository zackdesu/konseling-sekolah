import { AiFillCompass, AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="fixed bottom-5 left-0 right-0">
      <div className="bg-zinc-200 px-4 py-3 max-w-[250px] w-[55%] min-[500px]:w-[40%] md:w-1/3 mx-auto flex justify-between items-center rounded-full">
        <Link to={"/"}>
          <AiFillHome size={20} className="min-w-[20px]" />
        </Link>
        <Link to={"/feed"}>
          <AiFillCompass size={20} className="max-[450px]:min-w-[20px]" />
        </Link>
        <Link to={"/search"}>
          <BiSearch size={20} className="max-[450px]:min-w-[20px]" />
        </Link>
        <Link to={"/profil"}>
          <BsFillPersonFill size={20} className="max-[450px]:min-w-[20px]" />
        </Link>
      </div>
    </div>
  );
};
export default Menu;
