import { IconType } from "react-icons";
import { BsPersonFill } from "react-icons/bs";
import { connectApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import Redirectuser from "../utils/redirecthome";

const Settings = () => {
  Redirectuser();

  const SettingsMenu = ({
    icon: Icon,
    title,
    desc,
  }: {
    icon: IconType;
    title: string;
    desc: string;
  }) => (
    <div className="bg-zinc-100 p-2 border-2 w-[95%] sm:w-8/12 md:w-1/2 h-[60px] grid grid-rows-2 grid-cols-[60px_minmax(100px,_1fr)] auto-cols-[1fr,2fr,2fr] cursor-pointer mb-5">
      <Icon className="row-span-2 w-[35px] h-[35px] place-self-center rounded-full p-1 border" />
      <h5 className="self-end">{title}</h5>
      <p className="text-zinc-500">{desc}</p>
    </div>
  );

  const navigate = useNavigate();

  const handleLogOut = () => {
    connectApi("/login", "delete")
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err: IAPIError) => console.error(err.response.data.message));
  };

  return (
    <div className="py-20 flex flex-col items-center">
      <h2 className="my-5">Pengaturan</h2>
      <SettingsMenu
        icon={BsPersonFill as IconType}
        title="Informasi Akun"
        desc="Rincian akun anda"
      />
      <button className="normalbutton bg-red-600" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};
export default Settings;
