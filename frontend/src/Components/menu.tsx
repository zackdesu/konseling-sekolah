import { AiFillCompass, AiFillHome } from "react-icons/ai";
import { BsChatSquareDotsFill, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="mx-auto fixed bottom-5 left-0 right-0 max-w-[250px] w-[55%] min-[500px]:w-[40%] md:w-1/3 z-30">
      <div className="bg-zinc-200 px-8 py-3 flex justify-between items-center rounded-full relative">
        <Link to={"/"}>
          <AiFillHome size={20} className="min-w-[20px]" />
        </Link>
        <Link to={"/feed"}>
          <AiFillCompass size={20} className="max-[450px]:min-w-[20px]" />
        </Link>
        <Link to={"/list/chat"}>
          <BsChatSquareDotsFill
            size={17}
            className="max-[450px]:min-w-[20px]"
          />
        </Link>
        <Link to={"/profil"}>
          <BsFillPersonFill size={20} className="max-[450px]:min-w-[20px]" />
        </Link>
      </div>
    </div>
  );
};
export default Menu;
